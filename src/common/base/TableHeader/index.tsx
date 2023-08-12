// React
import { memo, ReactNode } from 'react';

// MUI Components
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import TextField, { TextFieldProps } from '@mui/material/TextField';

import { useTheme } from '@mui/material/styles';

// MUI Icons
import SearchRounded from '@mui/icons-material/SearchRounded';

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
