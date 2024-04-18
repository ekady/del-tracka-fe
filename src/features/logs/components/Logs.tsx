import dayjs from 'dayjs';

import { GridColDef } from '@mui/x-data-grid';

import { DataTable } from '@/common/base';

import { ITableAndSearchProps } from '@/common/types';
import { ILogsResponse } from '../interfaces';
import { ActivityMessage, TActivityType } from '../constants/activityType.constant';

const dateColumn: GridColDef<ILogsResponse> = {
  headerName: 'Date',
  field: 'date',
  valueGetter: ({ row }) => dayjs(row?.createdAt).format('MMM-DD-YYYY HH:mm'),
  width: 150,
  sortable: false,
};

const projectColumn: GridColDef<ILogsResponse> = {
  headerName: 'Project Name',
  field: 'project',
  valueGetter: ({ row }) => row?.project,
  width: 150,
  sortable: false,
};

const sprintColumn: GridColDef<ILogsResponse> = {
  headerName: 'Sprint',
  field: 'sprint',
  valueGetter: ({ row }) => row?.stageAfter.name || row?.stageBefore.name,
  width: 100,
  sortable: false,
};

const activityColumn: GridColDef<ILogsResponse> = {
  headerName: 'Activity',
  field: 'activity',
  valueGetter: ({ row }) => ActivityMessage[row.type as TActivityType](row),
  sortable: false,
  width: 400,
};

const tableHeaders: GridColDef<ILogsResponse>[] = [dateColumn, projectColumn, sprintColumn, activityColumn];

const LogsUI = ({ TableProps }: ITableAndSearchProps) => {
  return (
    <DataTable
      rows={[]}
      columns={tableHeaders}
      rowCount={undefined}
      pagination={undefined}
      paginationMode={undefined}
      hideFooterPagination
      getRowHeight={() => 'auto'}
      getEstimatedRowHeight={() => 150}
      density="comfortable"
      {...TableProps}
    />
  );
};

export default LogsUI;
