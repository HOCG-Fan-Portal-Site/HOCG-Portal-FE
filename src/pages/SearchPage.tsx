import { Container, CircularProgress, Alert } from '@mui/material';
import { SearchBar } from '../components/SearchBar/SearchBar';
import { CardGrid } from '../components/CardGrid/CardGrid';
import { useCardSearch } from '../hooks/useCardSearch';
import { Card } from '../types/card';
import { TypeFilter } from '../components/TypeFilter/TypeFilter';
import { TypeFilterState } from '../components/TypeFilter/TypeFilter.types';
import { filterCards } from '../components/TypeFilter/TypeFilter.utils';
import { useCardFilters } from '../hooks/useCardFilters';
import {
  SearchContainer,
  SearchTitle,
  SearchSubtitle,
} from './SearchPage.styles';

// 頁面專用組件
const SearchHeader = () => (
  <>
    <SearchTitle variant="h3" align="center">
      Card Search
    </SearchTitle>
    <SearchSubtitle variant="subtitle1" align="center">
      Search for your favorite Hololive cards by name or card type
    </SearchSubtitle>
  </>
);

interface SearchErrorProps {
  error: string | null;
}

const SearchError = ({ error }: SearchErrorProps) => {
  if (!error) return null;

  return (
    <Alert severity="error" sx={{ mt: 2 }}>
      {error}
    </Alert>
  );
};

interface SearchResultsProps {
  isLoading: boolean;
  cards: Card[];
  typeFilters: TypeFilterState;
}

const SearchResults = ({ isLoading, cards, typeFilters }: SearchResultsProps) => {
  if (isLoading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  const filteredCards = filterCards(cards, typeFilters);
  return <CardGrid cards={filteredCards} />;
};

// 主頁面組件
export const SearchPage = () => {
  const { cards, query, isLoading, error, searchCards, clearSearchState } = useCardSearch();
  const { filters, setFilters, clearFilters } = useCardFilters();

  const handleClear = () => {
    clearSearchState();
    clearFilters();
  };

  return (
    <SearchContainer maxWidth="lg">
      <SearchHeader />
      <SearchBar
        initialQuery={query}
        onSearch={searchCards}
        onClear={handleClear}
      />
      <TypeFilter filters={filters} onChange={setFilters} />
      <SearchError error={error} />
      <SearchResults isLoading={isLoading} cards={cards} typeFilters={filters} />
    </SearchContainer>
  );
};
