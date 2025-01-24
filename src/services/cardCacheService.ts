import { Card } from '../types/card';

const CACHE_KEY = 'card_data_cache';
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

interface CacheItem {
  data: Record<string, Card>;
  timestamp: number;
}

export const cardCacheService = {
  // 儲存整個卡片數據
  setCardData(data: Record<string, Card>) {
    const cacheItem: CacheItem = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheItem));
  },

  // 獲取緩存的卡片數據
  getCardData(): Record<string, Card> | null {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const cacheItem: CacheItem = JSON.parse(cached);
    
    // 檢查緩存是否過期
    if (Date.now() - cacheItem.timestamp > CACHE_EXPIRY) {
      this.clearCache();
      return null;
    }

    return cacheItem.data;
  },

  // 從緩存獲取單張卡片
  getCard(cardId: string): Card | null {
    const data = this.getCardData();
    return data ? data[cardId] || null : null;
  },

  // 清除緩存
  clearCache() {
    localStorage.removeItem(CACHE_KEY);
  },

  // 檢查緩存是否有效
  isValid(): boolean {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return false;

    const cacheItem: CacheItem = JSON.parse(cached);
    return Date.now() - cacheItem.timestamp <= CACHE_EXPIRY;
  }
};
