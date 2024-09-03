'use client';

import { useCallback, useMemo, useState } from 'react';

// MUI Components
import ContentCopy from '@mui/icons-material/ContentCopy';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { toast } from 'react-toastify';

// Types
import BaseDialogAlert from '@/app/_common/base/BaseDialogAlert';
import useDialogAlert from '@/app/_common/base/BaseDialogAlert/useDialogAlert';
import DataTable from '@/app/_common/base/DataTable';
import TableAction from '@/app/_common/base/TableAction';
import TableCellLevel from '@/app/_common/base/TableCellLevel';
import TableCellStatus from '@/app/_common/base/TableCellStatus';
import TableMenuSelection from '@/app/_common/base/TableMenuSelection';
import { TLevelType } from '@/app/_common/constants/level.constant';
import STATUS, { TStatusType } from '@/app/_common/constants/status.constant';
import { copyToClipboard } from '@/app/_common/helper';
// import TaskMoveSprint from './TaskMoveSprint';
import { useTableChange } from '@/app/_common/hooks/useTableChange.hook';
import { IPaginationResponse, TFunctionVoid, TFunctionVoidWithParams } from '@/app/_common/types';
import {
  actionTaskDelete,
  actionTaskUpdateStatus,
  revalidateTaskListTag,
} from '@/app/app/projects/[id]/[sprint_id]/_actions/task.action';
import { ITaskResponse } from '@/app/app/projects/_interfaces';

const statusSelectionList = Object.keys(STATUS).map(
  (key) =>
    ({ name: STATUS[key as TStatusType].name, value: STATUS[key as TStatusType].value }) as Record<string, string>,
);

export interface IMyTaskTableProps {
  taskPagination: IPaginationResponse<ITaskResponse>;
}

const MyTaskTable = ({ taskPagination }: IMyTaskTableProps) => {
  const [loading, setLoading] = useState(false);

  const { dialogAlertOpt, openDialogWarning, closeDialogAlert } = useDialogAlert();

  const { onPaginationChange, onSortChange } = useTableChange();

  const handleChangeStatus = useCallback(
    (item: ITaskResponse) =>
      async (status: string): Promise<void> => {
        setLoading(true);
        try {
          const response = await actionTaskUpdateStatus(
            { projectId: item?.project!.shortId, sprintId: item?.stage!.shortId, taskId: item!.shortId! },
            { status },
          );
          if (response.isSuccess) {
            revalidateTaskListTag(item?.project!.shortId, item?.stage!.shortId);
            toast.success('Task Status updated successfully');
          }

          if (response.isError) {
            toast.error(response.message.toString());
          }
        } finally {
          setLoading(false);
        }
      },
    [],
  );

  const handleDeleteTask = useCallback(
    async (item: ITaskResponse) => {
      setLoading(true);
      try {
        const response = await actionTaskDelete({
          projectId: item?.project!.shortId,
          sprintId: item?.stage!.shortId,
          taskId: item!.shortId!,
        });
        if (response.isSuccess) {
          revalidateTaskListTag(item?.project!.shortId, item.stage!.shortId);
          toast.success('Task deleted successfully');
          closeDialogAlert();
        }

        if (response.isError) {
          toast.error(response.message);
        }
      } finally {
        setLoading(false);
      }
    },
    [closeDialogAlert],
  );

  const openDialogDeleteWarning = useCallback(
    (item: ITaskResponse) => {
      openDialogWarning('Confirmation', 'Are you sure you want to delete this task?', {
        type: 'warning',
        handleOk: (() => handleDeleteTask(item)) as TFunctionVoid,
        handleCancel: closeDialogAlert,
      });
    },
    [closeDialogAlert, handleDeleteTask, openDialogWarning],
  );

  const renderCellStatus = useCallback(
    (params: GridRenderCellParams<ITaskResponse, string>) => (
      <TableCellStatus
        SelectOption={
          <TableMenuSelection
            list={statusSelectionList}
            itemText="name"
            currentValue={params.value ?? ''}
            handleChange={handleChangeStatus(params.row) as TFunctionVoidWithParams<string>}
            IconProps={{ sx: { color: STATUS[params.value as TStatusType].textColor, padding: 0, mr: 1 } }}
          />
        }
        status={params.value as TStatusType}
      />
    ),
    [handleChangeStatus],
  );

  const renderCellLevel = useCallback(
    (params: GridRenderCellParams<ITaskResponse>) => <TableCellLevel level={params.value as TLevelType} />,
    [],
  );

  const renderCellAction = useCallback(
    ({ row }: GridRenderCellParams<ITaskResponse, string>) => (
      <TableAction
        hideDelete={!row?.permissions?.delete}
        hideEdit={!row?.permissions?.update}
        hideView={!row?.permissions?.read}
        toView={`/app/projects/${row?.project?.shortId}/${row?.stage?.shortId}/${row.shortId}`}
        toEdit={`/app/projects/${row?.project?.shortId}/${row?.stage?.shortId}/${row.shortId}/edit`}
        handleDelete={() => openDialogDeleteWarning(row)}
      />
    ),
    [openDialogDeleteWarning],
  );

  const renderCellTaskId = useCallback(
    ({ row }: GridRenderCellParams<ITaskResponse, string>) => (
      <Box display="flex" alignItems="center" justifyContent="center" gap={1} height="100%">
        <Typography>{`#${row.shortId}`}</Typography>
        <IconButton id="demo-positioned-button" aria-haspopup="true" onClick={() => copyToClipboard(`#${row.shortId}`)}>
          <ContentCopy />
        </IconButton>
      </Box>
    ),
    [],
  );

  const tableHeaders: GridColDef<ITaskResponse, string>[] = useMemo<GridColDef<ITaskResponse, string>[]>(
    () => [
      { headerName: 'Action', field: 'action', sortable: false, width: 150, renderCell: renderCellAction },
      { headerName: 'Task Id', field: 'shortId', sortable: false, width: 170, renderCell: renderCellTaskId },
      { headerName: 'Title', field: 'title', width: 300 },
      { headerName: 'Status', field: 'status', width: 200, renderCell: renderCellStatus },
      { headerName: 'Category', field: 'feature', width: 200 },
      { headerName: 'Level', field: 'priority', width: 200, renderCell: renderCellLevel },
      {
        headerName: 'Due Date',
        field: 'dueDate',
        width: 150,
        renderCell: (val) => (val.value ? new Date(val.value).toLocaleDateString() : '-'),
      },
      {
        headerName: 'Reporter',
        field: 'reporter',
        renderCell: ({ row }) => (row.reporter ? `${row.reporter.firstName} ${row.reporter.lastName}` : '-'),
        width: 200,
      },
      {
        headerName: 'Assignee',
        field: 'assignee',
        renderCell: ({ row }) => (row.assignee ? `${row.assignee.firstName} ${row.assignee.lastName}` : '-'),
      },
      {
        headerName: 'Date Updated',
        field: 'updatedAt',
        width: 200,
        renderCell: (val) => (val.value ? new Date(val.value).toLocaleString() : '-'),
      },
    ],
    [renderCellAction, renderCellLevel, renderCellStatus, renderCellTaskId],
  );

  return (
    <>
      <BaseDialogAlert {...dialogAlertOpt} loading={loading} />
      <DataTable
        columns={tableHeaders}
        rows={taskPagination?.data}
        getRowId={(val) => val.shortId}
        paginationMode="server"
        rowCount={taskPagination?.pagination?.total ?? 0}
        loading={loading}
        paginationModel={{
          page: (taskPagination?.pagination?.page || 1) - 1,
          pageSize: taskPagination?.pagination?.limit ?? 10,
        }}
        onSortModelChange={onSortChange}
        onPaginationModelChange={onPaginationChange}
      />
    </>
  );
};

export default MyTaskTable;
