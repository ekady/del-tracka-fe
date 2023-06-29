// React
import { memo, ReactNode } from 'react';

// MUI Components
import { Box, InputAdornment, TextField, TextFieldProps, useTheme } from '@mui/material';

// MUI Icons
import { SearchRounded } from '@mui/icons-material';

export interface TableHeaderProps {
  TextFieldProps?: TextFieldProps;
  isUsingSearch?: boolean;
  header?: ReactNode;
}

const TableHeader = ({ TextFieldProps, isUsingSearch, header }: TableHeaderProps) => {
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Box>{header}</Box>
      {isUsingSearch && (
        <TextField
          placeholder="Search"
          size="small"
          sx={{ backgroundColor: theme.palette.mode === 'dark' ? 'transparent' : 'white' }}
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
