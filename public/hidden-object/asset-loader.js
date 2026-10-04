/**
 * Asset Loader Engine
 * Caching, Async & Lazy Loading
 */
class AssetLoader {
  constructor() {
    this.cache = new Map();
  }

  async loadImage(src) {
    if (this.cache.has(src)) {
      return this.cache.get(src);
    }
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.cache.set(src, img);
        resolve(img);
      };
      img.onerror = () => {
        reject(new Error(`Failed to load image: ${src}`));
      };
      img.src = src;
    });
  }

  preloadNextScene(nextSrc) {
    if (nextSrc && !this.cache.has(nextSrc)) {
      this.loadImage(nextSrc).catch(() => {});
    }
  }
}

window.AssetLoader = new AssetLoader();
