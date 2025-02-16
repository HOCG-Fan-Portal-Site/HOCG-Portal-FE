import { Card } from '../types/card';
import { useLocalStorageState } from './useLocalStorageState';
import { STORAGE_KEYS } from '../constants/storage';

interface SearchState {
  query: string;
  results: Card[];
}

export const usePersistedSearch = () => {
  const [searchState, setSearchState] = useLocalStorageState<SearchState>(STORAGE_KEYS.SEARCH_STATE, {
    query: '',
    results: []
  });

  const updateSearchState = (query: string, results: Card[]) => {
    setSearchState({ query, results });
  };

  const clearSearchState = () => {
    setSearchState({ query: '', results: [] });
    localStorage.removeItem(STORAGE_KEYS.SEARCH_STATE);
  };

  return {
    searchState,
    updateSearchState,
    clearSearchState
  };
};
