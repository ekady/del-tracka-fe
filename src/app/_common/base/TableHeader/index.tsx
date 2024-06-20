// React
import { memo, ReactNode } from 'react';

// MUI Components
import SearchRounded from '@mui/icons-material/SearchRounded';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import TextField, { TextFieldProps } from '@mui/material/TextField';

// MUI Icons

export interface ITableHeaderProps {
  TextFieldProps?: TextFieldProps;
  isUsingSearch?: boolean;
  children?: ReactNode;
}

const TableHeader = ({ TextFieldProps, isUsingSearch, children }: ITableHeaderProps) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
      <Box>{children}</Box>
      {isUsingSearch && (
        <TextField
          placeholder="Search"
          size="small"
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
