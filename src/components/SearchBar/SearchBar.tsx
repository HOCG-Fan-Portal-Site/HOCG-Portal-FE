import { useState, useEffect } from 'react';
import { TextField, Button, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  initialQuery?: string;
  onSearch: (query: string) => void;
  onClear?: () => void;
}

export const SearchBar = ({ initialQuery = '', onSearch, onClear }: SearchBarProps) => {
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleSearch = () => {
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onClear?.();
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
        slotProps={{
          input: {
            endAdornment: query && (
              <IconButton size="small" onClick={handleClear}>
                <ClearIcon />
              </IconButton>
            )
          }
        }}
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
