import { LinearProgress } from '@mui/material';
import { DataGridProps } from '@mui/x-data-grid';

import { DataGridStyled } from './styled';

import { table } from '@/common/constants';

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
