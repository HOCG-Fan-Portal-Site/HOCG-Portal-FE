import { useState } from 'react';
import { cardService } from '../services/cardService';
import { usePersistedSearch } from './usePersistedSearch';

export const useCardSearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { searchState, updateSearchState, clearSearchState } = usePersistedSearch();

  const searchCards = async (query: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const results = await cardService.searchCards(query);
      updateSearchState(query, results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while searching');
      clearSearchState();
    } finally {
      setIsLoading(false);
    }
  };

  return {
    cards: searchState.results,
    query: searchState.query,
    isLoading,
    error,
    searchCards,
    clearSearchState
  };
};
