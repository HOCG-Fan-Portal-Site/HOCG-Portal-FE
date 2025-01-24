import { useState, useEffect } from 'react';
import { Card } from '../types/card';

const STORAGE_KEY = 'cardSearchState';

interface SearchState {
  query: string;
  results: Card[];
}

export const usePersistedSearch = () => {
  // 初始化時從 localStorage 讀取狀態
  const getInitialState = (): SearchState => {
    const savedState = localStorage.getItem(STORAGE_KEY);
    return savedState ? JSON.parse(savedState) : { query: '', results: [] };
  };

  const [searchState, setSearchState] = useState<SearchState>(getInitialState);

  // 當狀態改變時，保存到 localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(searchState));
  }, [searchState]);

  const updateSearchState = (query: string, results: Card[]) => {
    setSearchState({ query, results });
  };

  const clearSearchState = () => {
    setSearchState({ query: '', results: [] });
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    searchState,
    updateSearchState,
    clearSearchState
  };
};
