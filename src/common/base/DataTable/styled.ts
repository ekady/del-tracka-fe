import { ElementType } from 'react';

import { styled } from '@mui/material';
import { DataGrid as DataGridMUI } from '@mui/x-data-grid';

export const DataGridStyled: ElementType = styled(DataGridMUI)(({ theme }) => ({
  border: 'none',

  '& .MuiDataGrid-main > div:first-of-type': {
    zIndex: 1,
  },

  '& .MuiDataGrid-columnHeaderTitle': {
    fontWeight: 'bold',
  },
  '& .MuiDataGrid-row': {
    backgroundColor: theme.palette.mode === 'dark' ? 'transparent' : 'white',
  },
  '& .MuiDataGrid-cell': {
    borderColor: 'transparent',
    py: '16px',
    minHeight: '70px !important',
  },
}));
