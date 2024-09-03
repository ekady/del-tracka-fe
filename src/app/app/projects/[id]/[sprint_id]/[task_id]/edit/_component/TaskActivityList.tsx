'use client';

import { GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';

import DataTable from '@/app/_common/base/DataTable';
import { useTableChange } from '@/app/_common/hooks/useTableChange.hook';
import { IPaginationResponse } from '@/app/_common/types';
import { ActivityMessage, TActivityType } from '@/app/app/projects/_constant/activityType.constant';
import { IProjectActivityResponse } from '@/app/app/projects/_interfaces';

interface ITaskActivityListProps {
  activities: IPaginationResponse<IProjectActivityResponse> | null;
}

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
  renderCell: ({ row }) => row?.stageAfter.name || row?.stageBefore.name,
  width: 100,
  sortable: false,
};

const activityColumn: GridColDef<IProjectActivityResponse> = {
  headerName: 'Activity',
  field: 'activity',
  renderCell: ({ row }) => ActivityMessage[row.type as TActivityType](row),
  sortable: false,
  width: 400,
};

const tableHeaders: GridColDef<IProjectActivityResponse>[] = [dateColumn, sprintColumn, activityColumn];

const TaskActivityList = ({ activities }: ITaskActivityListProps) => {
  const { onPaginationChange, onSortChange } = useTableChange();

  return (
    <DataTable
      rows={activities?.data ?? []}
      columns={tableHeaders}
      rowCount={activities?.pagination?.total ?? 0}
      paginationMode="server"
      paginationModel={{
        pageSize: activities?.pagination?.limit ?? 10,
        page: (activities?.pagination?.page || 1) - 1,
      }}
      onSortModelChange={onSortChange}
      onPaginationModelChange={onPaginationChange}
      getRowHeight={() => 'auto'}
      getEstimatedRowHeight={() => 150}
      density="comfortable"
      getRowSpacing={() => ({ bottom: 8, top: 8 })}
      getRowId={(row) => row.createdAt}
      sx={{ mt: 4 }}
    />
  );
};

export default TaskActivityList;
