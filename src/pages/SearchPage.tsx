import { Container, CircularProgress, Alert } from '@mui/material';
import { SearchBar } from '../components/SearchBar/SearchBar';
import { CardGrid } from '../components/CardGrid/CardGrid';
import { useCardSearch } from '../hooks/useCardSearch';
import { Card } from '../types/card';
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
}

const SearchResults = ({ isLoading, cards }: SearchResultsProps) => {
  if (isLoading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  return <CardGrid cards={cards} />;
};

// 主頁面組件
export const SearchPage = () => {
  const { cards, isLoading, error, searchCards } = useCardSearch();

  return (
    <SearchContainer maxWidth="lg">
      <SearchHeader />
      <SearchBar onSearch={searchCards} />
      <SearchError error={error} />
      <SearchResults isLoading={isLoading} cards={cards} />
    </SearchContainer>
  );
};
