// React
import { memo, ReactNode } from 'react';

// MUI Components
import { Box, InputAdornment, TextField, TextFieldProps } from '@mui/material';

// MUI Icons
import { SearchRounded } from '@mui/icons-material';

export interface TableHeaderProps {
  TextFieldProps?: TextFieldProps;
  isUsingSearch?: boolean;
  header?: ReactNode;
}

const TableHeader = ({ TextFieldProps, isUsingSearch, header }: TableHeaderProps) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Box>{header}</Box>
      {isUsingSearch && (
        <TextField
          placeholder="Search"
          size="small"
          sx={{ backgroundColor: 'white' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRounded />
              </InputAdornment>
            ),
          }}
          {...TextFieldProps}
        />
      )}
    </Box>
  );
};

export default memo(TableHeader);
