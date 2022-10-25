import moment from 'moment';

import { GridColDef } from '@mui/x-data-grid';

import { DataTable } from '@/common/base';

import { ITableAndSearchProps } from '@/common/types';
import { ILogsResponse } from '../store/logs.api.slice';
import { ActivityMessage } from '../constants/activityType.constant';

const tableHeaders: GridColDef<ILogsResponse>[] = [
  {
    headerName: 'Date',
    field: 'date',
    valueGetter: ({ row }) => moment(row?.createdAt).format('MMM-DD-YYYY HH:mm'),
    width: 150,
    sortable: false,
  },
  {
    headerName: 'Project Name',
    field: 'projectName',
    valueGetter: ({ row }) => row?.project.name,
    width: 200,
    sortable: false,
  },
  {
    headerName: 'Activity',
    field: 'activity',
    valueGetter: ({ row }) => ActivityMessage[row.type](row),
    sortable: false,
    width: 400,
  },
];

const LogsUI = ({ TableProps }: ITableAndSearchProps) => {
  return (
    <DataTable
      rows={[]}
      columns={tableHeaders}
      {...TableProps}
      rowCount={undefined}
      pagination={undefined}
      paginationMode={undefined}
      hideFooterPagination
    />
  );
};

export default LogsUI;
