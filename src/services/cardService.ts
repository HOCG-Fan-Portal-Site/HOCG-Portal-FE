import { Card } from '../types/card';

export const cardService = {
  searchCards: async (query: string): Promise<Card[]> => {
    try {
      if (!query.trim()) {
        return [];
      }

      const response = await fetch('/card_data.json');
      const data: Record<string, Card> = await response.json();
      
      const searchQuery = query.toLowerCase();
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
      const response = await fetch('/card_data.json');
      const data: Record<string, Card> = await response.json();
      
      // 直接從 data 物件中獲取卡片
      return data[cardId] || null;
    } catch (error) {
      console.error('Error fetching card:', error);
      throw error;
    }
  }
};
