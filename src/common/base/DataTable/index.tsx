import { table } from '@/common/constants';
import { LinearProgress } from '@mui/material';
import { DataGridProps } from '@mui/x-data-grid';
import { DataGridStyled } from './styled';

const DataTable = (props: DataGridProps) => {
  return (
    <DataGridStyled
      disableSelectionOnClick
      disableColumnMenu
      autoHeight
      rowHeight={60}
      sortingMode="server"
      paginationMode="server"
      rowCount={0}
      initialState={{
        pagination: {
          page: table.initialPage,
          pageSize: table.initialLimit,
        },
      }}
      pagination
      rowsPerPageOptions={table.limitOptions}
      components={{
        LoadingOverlay: LinearProgress,
      }}
      {...props}
    />
  );
};
export default DataTable;
