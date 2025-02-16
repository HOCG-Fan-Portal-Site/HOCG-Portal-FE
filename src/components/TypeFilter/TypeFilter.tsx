import { FormGroup, FormControlLabel, Checkbox, Collapse } from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { TypeFilterState } from './TypeFilter.types';
import styles from './TypeFilter.module.css';
import { useState, useMemo } from 'react';

interface TypeFilterProps {
  filters: TypeFilterState;
  onChange: (filters: TypeFilterState) => void;
}

export const TypeFilter = ({ filters, onChange }: TypeFilterProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const activeFiltersCount = useMemo(() => 
    Object.values(filters).filter(Boolean).length,
    [filters]
  );

  const handleChange = (filterKey: keyof TypeFilterState) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChange({
      ...filters,
      [filterKey]: event.target.checked,
    });
  };

  return (
    <div className={styles.filterContainer}>
      <div 
        className={styles.filterHeader}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className={styles.filterTitle}>
          <span>Filter by Card Type</span>
          {activeFiltersCount > 0 && (
            <span className={styles.activeFiltersCount}>
              {activeFiltersCount}
            </span>
          )}
        </div>
        <ExpandMoreIcon 
          className={`${styles.filterIcon} ${isExpanded ? styles.expanded : ''}`}
        />
      </div>
      <Collapse in={isExpanded}>
        <div className={styles.filterContent}>
          <FormGroup className={styles.filterGroup}>
            <FormControlLabel
              className={styles.filterLabel}
              control={
                <Checkbox
                  className={styles.checkbox}
                  checked={filters.holoMemberCard}
                  onChange={handleChange('holoMemberCard')}
                />
              }
              label="Holo Member Card"
            />
            <FormControlLabel
              className={styles.filterLabel}
              control={
                <Checkbox
                  className={styles.checkbox}
                  checked={filters.oshiHoloMemberCard}
                  onChange={handleChange('oshiHoloMemberCard')}
                />
              }
              label="Oshi Holo Member Card"
            />
            <FormControlLabel
              className={styles.filterLabel}
              control={
                <Checkbox
                  className={styles.checkbox}
                  checked={filters.supportCard}
                  onChange={handleChange('supportCard')}
                />
              }
              label="Support Card"
            />
          </FormGroup>
        </div>
      </Collapse>
    </div>
  );
};
