import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface SortOption {
  value: string;
  label: string;
}

interface LabSortProps {
  sortBy: string;
  onSort: (sortValue: string) => void;
  options: SortOption[];
}

export function LabSort({ sortBy, onSort, options }: LabSortProps) {
  return (
    <Box display="flex" alignItems="center">
  
      <Select
        value={sortBy}
        onChange={(e) => onSort(e.target.value as string)}
        variant="outlined"
        size="small"
        sx={{ ml: 2 }}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
