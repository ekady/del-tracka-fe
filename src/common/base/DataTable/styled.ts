import { styled } from '@mui/material';
import { DataGrid as DataGridMUI } from '@mui/x-data-grid';

export const DataGridStyled = styled(DataGridMUI)(() => ({
  border: 'none',

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
