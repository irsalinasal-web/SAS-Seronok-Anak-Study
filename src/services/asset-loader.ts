import { BackgroundScene, GameSession } from '../data/hiddenObjectConfig';

/**
 * Asset Loader for Hidden Object Module.
 * Preloads and caches background images safely.
 */
class AssetLoader {
  private cache: Map<string, HTMLImageElement> = new Map();
  private loadingPromises: Map<string, Promise<boolean>> = new Map();

  /**
   * Preload a single background image asynchronously with caching
   */
  public async preloadImage(src?: string): Promise<boolean> {
    if (!src) return true;
    if (this.cache.has(src)) {
      return true;
    }

    if (this.loadingPromises.has(src)) {
      return this.loadingPromises.get(src)!;
    }

    const promise = new Promise<boolean>((resolve) => {
      const img = new Image();
      img.referrerPolicy = 'no-referrer';
      img.onload = () => {
        this.cache.set(src, img);
        this.loadingPromises.delete(src);
        resolve(true);
      };
      img.onerror = () => {
        this.loadingPromises.delete(src);
        resolve(false);
      };
      img.src = src;
    });

    this.loadingPromises.set(src, promise);
    return promise;
  }

  /**
   * Preload next background in session in background (Lazy loader)
   */
  public preloadNextInSession(session: GameSession, currentSceneIndex: number, scenes: Record<string, BackgroundScene>) {
    const nextIndex = currentSceneIndex + 1;
    if (nextIndex < session.sceneIds.length) {
      const nextSceneId = session.sceneIds[nextIndex];
      const nextScene = scenes[nextSceneId];
      if (nextScene?.defaultImage) {
        this.preloadImage(nextScene.defaultImage).catch(() => {});
      }
    }
  }

  /**
   * Clear cache if low memory
   */
  public clearCache() {
    this.cache.clear();
    this.loadingPromises.clear();
  }
}

export const assetLoader = new AssetLoader();
