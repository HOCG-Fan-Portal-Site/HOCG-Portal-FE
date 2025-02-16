import { useState, useEffect } from 'react';

export function useLocalStorageState<T>(key: string, defaultValue: T) {
  // 從 LocalStorage 獲取初始值
  const getInitialValue = (): T => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  };

  const [state, setState] = useState<T>(getInitialValue);

  // 當 state 改變時，更新 LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error(`Error saving to localStorage: ${error}`);
    }
  }, [key, state]);

  return [state, setState] as const;
}
