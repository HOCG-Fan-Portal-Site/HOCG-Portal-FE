import { useState, useEffect } from 'react';
import { Card } from '../types/card';
import { cardService } from '../services/cardService';

export const useCardDetail = (cardId: string) => {
  const [card, setCard] = useState<Card | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const cardData = await cardService.getCardById(cardId);
        setCard(cardData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch card details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCard();
  }, [cardId]);

  return { card, isLoading, error };
};
