import { styled } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const StyledDataTable = styled(DataGrid)(() => ({
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

export default StyledDataTable;
