import { useLocalStorageState } from './useLocalStorageState';
import { TypeFilterState } from '../components/TypeFilter/TypeFilter.types';
import { STORAGE_KEYS } from '../constants/storage';

const DEFAULT_FILTERS: TypeFilterState = {
  holoMemberCard: false,
  oshiHoloMemberCard: false,
  supportCard: false,
};

export const useCardFilters = () => {
  const [filters, setFilters] = useLocalStorageState<TypeFilterState>(
    STORAGE_KEYS.TYPE_FILTERS,
    DEFAULT_FILTERS
  );

  const clearFilters = () => {
    setFilters(DEFAULT_FILTERS);
    localStorage.removeItem(STORAGE_KEYS.TYPE_FILTERS);
  };

  return {
    filters,
    setFilters,
    clearFilters,
  };
};
