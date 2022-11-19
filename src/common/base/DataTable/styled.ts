import { ElementType } from 'react';

import { styled } from '@mui/material';
import { DataGrid as DataGridMUI } from '@mui/x-data-grid';

export const DataGridStyled: ElementType = styled(DataGridMUI)(() => ({
  border: 'none',

  '& .MuiDataGrid-main > div:first-of-type': {
    zIndex: 1,
  },

  '& .MuiDataGrid-columnHeaderTitle': {
    fontWeight: 'bold',
  },
  '& .MuiDataGrid-row': {
    backgroundColor: 'white',
  },
  '& .MuiDataGrid-cell': {
    borderBottom: 'none',
  },
}));
