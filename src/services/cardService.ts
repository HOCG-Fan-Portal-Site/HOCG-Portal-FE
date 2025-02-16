import { Card } from '../types/card';
import { cardCacheService } from './cardCacheService';

const baseurl = '/HOCG-Portal-FE/';

export const cardService = {
  // 獲取所有卡片數據
  async getAllCardData(): Promise<Record<string, Card>> {
    // 先檢查緩存
    const cachedData = cardCacheService.getCardData();
    if (cachedData) {
      return cachedData;
    }

    // 如果緩存中沒有，則從服務器獲取
    const response = await fetch(baseurl + 'card_data.json');
    const data: Record<string, Card> = await response.json();
    
    // 存入緩存
    cardCacheService.setCardData(data);
    
    return data;
  },

  searchCards: async (query: string): Promise<Card[]> => {
    try {
      const data = await cardService.getAllCardData();
      const searchQuery = query.toLowerCase().trim();
      
      if (!searchQuery) {
        return Object.values(data);
      }

      return Object.entries(data)
        .filter(([key]) => key.toLowerCase().includes(searchQuery))
        .map(([, card]) => card);
    } catch (error) {
      console.error('Error searching cards:', error);
      throw error;
    }
  },

  getCardById: async (cardId: string): Promise<Card | null> => {
    try {
      // 先檢查緩存
      const cachedCard = cardCacheService.getCard(cardId);
      if (cachedCard) {
        return cachedCard;
      }

      // 如果緩存中沒有，獲取所有數據
      const data = await cardService.getAllCardData();
      return data[cardId] || null;
    } catch (error) {
      console.error('Error fetching card:', error);
      throw error;
    }
  }
};
