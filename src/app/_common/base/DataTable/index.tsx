import LinearProgress from '@mui/material/LinearProgress';
import { DataGridProps } from '@mui/x-data-grid';

import { table } from '@/app/_common/constants';

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
      disableRowSelectionOnClick
      initialState={{
        pagination: {
          paginationModel: { page: table.initialPage, pageSize: table.initialLimit },
        },
      }}
      pagination
      pageSizeOptions={table.limitOptions}
      components={{
        LoadingOverlay: LinearProgress,
      }}
      {...props}
    />
  );
};
export default DataTable;
