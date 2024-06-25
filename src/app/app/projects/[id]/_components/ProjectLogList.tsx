'use client';

import { Box, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';

import DataTable from '@/app/_common/base/DataTable';
import TableHeader from '@/app/_common/base/TableHeader';
import { ActivityMessage, TActivityType } from '@/app/app/projects/_constant/activityType.constant';
import { IProjectActivityResponse } from '@/app/app/projects/_interfaces';

const dateColumn: GridColDef<IProjectActivityResponse> = {
  headerName: 'Date',
  field: 'date',
  renderCell: ({ row }) => dayjs(row?.createdAt).format('MMM-DD-YYYY HH:mm'),
  width: 150,
  sortable: false,
};

const sprintColumn: GridColDef<IProjectActivityResponse> = {
  headerName: 'Sprint',
  field: 'sprint',
  renderCell: ({ row }) => row?.stageAfter?.name || row?.stageBefore?.name || '-',
  width: 100,
  sortable: false,
};

const activityColumn: GridColDef<IProjectActivityResponse> = {
  headerName: 'Activity',
  field: 'activity',
  renderCell: ({ row }) => ActivityMessage[row.type as TActivityType](row),
  sortable: false,
  minWidth: 200,
  flex: 1,
};

const tableHeaders: GridColDef<IProjectActivityResponse>[] = [dateColumn, sprintColumn, activityColumn];

const ProjectLogList = ({ logs }: { logs: IProjectActivityResponse[] }) => {
  return (
    <>
      <TableHeader isUsingSearch={false}>
        <Typography variant="h6">Log Activities</Typography>
      </TableHeader>
      <Box sx={{ height: 20 }} />
      <DataTable
        rows={logs}
        getRowId={(row) => row.createdAt}
        columns={tableHeaders}
        getRowHeight={() => 'auto'}
        hideFooterPagination
        getRowSpacing={() => ({ bottom: 8, top: 8 })}
      />
    </>
  );
};

export default ProjectLogList;
