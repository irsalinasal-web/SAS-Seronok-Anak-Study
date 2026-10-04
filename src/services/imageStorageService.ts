/**
 * Image Storage Service with Instant Synchronous In-Memory & LocalStorage Cache.
 * Pre-warms on application startup so images load at 0ms (no placeholder/dashboard flash).
 */

const DB_NAME = 'SAS_HiddenObject_DB';
const STORE_NAME = 'scene_backgrounds';
const DB_VERSION = 1;

// Global synchronous in-memory cache
const memoryCache: Record<string, string> = {};

// Synchronously populate from localStorage at startup
if (typeof window !== 'undefined') {
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('sas_ho_img_')) {
        const sceneId = key.replace('sas_ho_img_', '');
        const val = localStorage.getItem(key);
        if (val) memoryCache[sceneId] = val;
      }
    }
  } catch {
    // Ignore quota or private mode errors
  }
}

class ImageStorageService {
  private dbPromise: Promise<IDBDatabase> | null = null;
  private isWarmedUp = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.warmUp();
    }
  }

  private getDB(): Promise<IDBDatabase> {
    if (this.dbPromise) return this.dbPromise;

    this.dbPromise = new Promise((resolve, reject) => {
      if (typeof window === 'undefined' || !window.indexedDB) {
        reject(new Error('IndexedDB not supported'));
        return;
      }

      const request = window.indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });

    return this.dbPromise;
  }

  /**
   * Pre-load all images from IndexedDB into synchronous memory cache immediately.
   */
  public async warmUp(): Promise<Record<string, string>> {
    if (this.isWarmedUp) return { ...memoryCache };

    try {
      const db = await this.getDB();
      return new Promise((resolve) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const cursorReq = store.openCursor();

        cursorReq.onsuccess = (e) => {
          const cursor = (e.target as IDBRequest<IDBCursorWithValue>).result;
          if (cursor) {
            const key = cursor.key as string;
            const val = cursor.value as string;
            memoryCache[key] = val;
            try {
              localStorage.setItem(`sas_ho_img_${key}`, val);
            } catch {
              // Ignore
            }
            cursor.continue();
          } else {
            this.isWarmedUp = true;
            resolve({ ...memoryCache });
          }
        };

        cursorReq.onerror = () => {
          this.isWarmedUp = true;
          resolve({ ...memoryCache });
        };
      });
    } catch {
      this.isWarmedUp = true;
      return { ...memoryCache };
    }
  }

  /**
   * Synchronously return cached images (0ms, instant).
   */
  public getAllImagesSync(): Record<string, string> {
    return { ...memoryCache };
  }

  public getImageSync(sceneId: string): string | null {
    return memoryCache[sceneId] || null;
  }

  public async saveImage(sceneId: string, dataUrl: string): Promise<void> {
    memoryCache[sceneId] = dataUrl;
    try {
      localStorage.setItem(`sas_ho_img_${sceneId}`, dataUrl);
    } catch {
      // Ignore
    }

    try {
      const db = await this.getDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        const req = store.put(dataUrl, sceneId);
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      });
    } catch {
      // IndexedDB fallback already in memoryCache and localStorage
    }
  }

  public async getImage(sceneId: string): Promise<string | null> {
    if (memoryCache[sceneId]) return memoryCache[sceneId];
    await this.warmUp();
    return memoryCache[sceneId] || null;
  }

  public async getAllImages(): Promise<Record<string, string>> {
    await this.warmUp();
    return { ...memoryCache };
  }

  public async removeImage(sceneId: string): Promise<void> {
    delete memoryCache[sceneId];
    try {
      localStorage.removeItem(`sas_ho_img_${sceneId}`);
    } catch {
      // Ignore
    }
    try {
      const db = await this.getDB();
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).delete(sceneId);
    } catch {
      // Ignore
    }
  }
}

export const imageStorage = new ImageStorageService();
