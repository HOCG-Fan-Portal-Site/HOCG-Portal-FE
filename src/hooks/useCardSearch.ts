import { useState } from 'react';
import { Card } from '../types/card';
import { cardService } from '../services/cardService';

export const useCardSearch = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchCards = async (query: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const results = await cardService.searchCards(query);
      setCards(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while searching');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    cards,
    isLoading,
    error,
    searchCards
  };
};
