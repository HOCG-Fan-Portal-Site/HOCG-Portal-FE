import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className={styles.searchContainer}>
      <TextField
        className={styles.searchInput}
        variant="outlined"
        placeholder="Search cards..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
      />
      <Button
        className={styles.searchButton}
        variant="contained"
        color="primary"
        onClick={handleSearch}
        startIcon={<SearchIcon />}
      >
        Search
      </Button>
    </div>
  );
};
