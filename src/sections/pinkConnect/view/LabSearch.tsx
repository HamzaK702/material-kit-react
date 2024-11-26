// LabSearch.tsx
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Lab } from './types';

interface LabSearchProps {
  labs: Lab[];
  onSearchResults: (filteredLabs: Lab[]) => void;
}

export const LabSearch: React.FC<LabSearchProps> = ({ labs, onSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const filteredLabs = labs.filter(
      (lab) =>
        lab.name.toLowerCase().includes(term) ||
        lab.location.toLowerCase().includes(term) ||
        lab.contactNumber.toLowerCase().includes(term) ||
        lab.email.toLowerCase().includes(term)
    );
    onSearchResults(filteredLabs);
  };

  return (
    <TextField
      label="Search Labs"
      value={searchTerm}
      onChange={handleSearch}
      variant="outlined"
      size="small"
      fullWidth
    />
  );
};
