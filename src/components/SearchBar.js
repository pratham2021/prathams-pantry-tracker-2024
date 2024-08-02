import React from 'react';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ value, onChange, onSearch }) => {
  return (
    <TextField
      value={value}
      onChange={onChange}
      onKeyPress={(event) => {
        if (event.key === 'Enter') {
          onSearch();
        }
      }}
      variant="outlined"
      placeholder="Search..."
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={onSearch}>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
      sx={{ width: '100%' }}
    />
  );
};

export default SearchBar;
