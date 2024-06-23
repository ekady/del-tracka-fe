'use client';

import { useCallback, useMemo, useState } from 'react';

// MUI Components
import ContentCopy from '@mui/icons-material/ContentCopy';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { toast } from 'react-toastify';

import BaseDialogAlert from '@/app/_common/base/BaseDialogAlert';
import useDialogAlert from '@/app/_common/base/BaseDialogAlert/useDialogAlert';
import DataTable from '@/app/_common/base/DataTable';
import HeaderProfilePicture from '@/app/_common/base/Header/HeaderProfilePicture';
import TableAction from '@/app/_common/base/TableAction';
import TableCellLevel from '@/app/_common/base/TableCellLevel';
import TableCellStatus from '@/app/_common/base/TableCellStatus';
import TableMenuSelection from '@/app/_common/base/TableMenuSelection';
import { TLevelType } from '@/app/_common/constants/level.constant';
import STATUS, { TStatusType } from '@/app/_common/constants/status.constant';
import { copyToClipboard } from '@/app/_common/helper';
import { useTableChange } from '@/app/_common/hooks/useTableChange.hook';
import { IPaginationResponse, TFunctionVoid, TFunctionVoidWithParams } from '@/app/_common/types';
import {
  actionTaskDelete,
  actionTaskUpdateStatus,
  revalidateTaskListTag,
} from '@/app/app/projects/[id]/[sprint_id]/_actions/task.action';
import {
  IProjectWithPermissions,
  ISprintResponse,
  ISprintsResponse,
  ITaskResponse,
} from '@/app/app/projects/_interfaces';

import TaskChangeStatusBulk from './TaskChangeStatusBulk';

// import TaskMoveSprint from './TaskMoveSprint';

const statusSelectionList = Object.keys(STATUS).map(
  (key) =>
    ({ name: STATUS[key as TStatusType].name, value: STATUS[key as TStatusType].value }) as Record<string, string>,
);

const renderCellLevel = (params: GridRenderCellParams<ITaskResponse>) => (
  <TableCellLevel level={params.value as TLevelType} />
);

const renderCellTaskId = ({ row }: GridRenderCellParams<ITaskResponse, string>) => (
  <Box display="flex" alignItems="center" justifyContent="center" gap={1} height="100%">
    <Typography>{`#${row.shortId}`}</Typography>
    <IconButton id="demo-positioned-button" aria-haspopup="true" onClick={() => copyToClipboard(`#${row.shortId}`)}>
      <ContentCopy />
    </IconButton>
  </Box>
);

export interface ITaskTableProps {
  project: IProjectWithPermissions | null;
  sprint: ISprintResponse | null;
  sprintList: ISprintsResponse[];
  taskPagination: IPaginationResponse<Omit<ITaskResponse, 'project' | 'stage'>[]>;
}

const TaskTable = ({ project, sprint, taskPagination }: ITaskTableProps) => {
  const [selection, setSelection] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const { dialogAlertOpt, openDialogWarning, closeDialogAlert } = useDialogAlert();

  const { onPaginationChange, onSortChange } = useTableChange();

  const handleChangeStatus = useCallback(
    (item: ITaskResponse) =>
      async (status: string): Promise<void> => {
        setLoading(true);
        try {
          const response = await actionTaskUpdateStatus(
            { projectId: project!.shortId, sprintId: sprint!.shortId, taskId: item!.shortId! },
            { status },
          );
          if (response.isSuccess) {
            revalidateTaskListTag(project!.shortId, sprint!.shortId);
            toast.success('Task Status updated successfully');
          }

          if (response.isError) {
            toast.error(response.message.toString());
          }
        } finally {
          setLoading(false);
        }
      },
    [project, sprint],
  );

  const handleDeleteTask = useCallback(
    async (item: ITaskResponse) => {
      setLoading(true);
      try {
        const response = await actionTaskDelete({
          projectId: project!.shortId,
          sprintId: sprint!.shortId,
          taskId: item!.shortId!,
        });
        if (response.isSuccess) {
          revalidateTaskListTag(project!.shortId, sprint!.shortId);
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
    [closeDialogAlert, project, sprint],
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

  const renderCellAction = useCallback(
    ({ row }: GridRenderCellParams<ITaskResponse, string>) => (
      <TableAction
        hideDelete={!project?.rolePermissions?.TASK.delete}
        hideEdit={!project?.rolePermissions?.TASK.update}
        hideView={!project?.rolePermissions?.TASK.read}
        toView={`/app/projects/${project?.shortId}/${sprint?.shortId}/${row.shortId}`}
        toEdit={`/app/projects/${project?.shortId}/${sprint?.shortId}/${row.shortId}/edit`}
        handleDelete={() => openDialogDeleteWarning(row)}
      />
    ),
    [openDialogDeleteWarning, project, sprint?.shortId],
  );

  const tableHeaders: GridColDef<ITaskResponse, string>[] = useMemo<GridColDef<ITaskResponse, string>[]>(
    () => [
      { headerName: 'Action', field: 'action', sortable: false, width: 120, renderCell: renderCellAction },
      { headerName: 'Task Id', field: 'shortId', sortable: false, width: 170, renderCell: renderCellTaskId },
      { headerName: 'Title', field: 'title', minWidth: 300, flex: 1 },
      { headerName: 'Status', field: 'status', width: 200, renderCell: renderCellStatus },
      { headerName: 'Level', field: 'priority', width: 200, renderCell: renderCellLevel },
      {
        headerName: 'Assignee',
        field: 'assignee',
        width: 120,
        renderCell: ({ row }) => (
          <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
            <HeaderProfilePicture image={row.assignee?.picture} />
          </Box>
        ),
      },
    ],
    [renderCellAction, renderCellStatus],
  );

  const handleCallbackBulkStatus = useCallback((statusUpdate: 'success' | 'error') => {
    if (statusUpdate === 'success') setSelection([]);
  }, []);

  return (
    <>
      <BaseDialogAlert {...dialogAlertOpt} loading={loading} />
      {selection.length > 0 && (
        <>
          <Box
            mt={2}
            display="flex"
            flexDirection={{ xs: 'column', md: 'row' }}
            justifyContent={{ xs: 'center', md: 'start' }}
            alignItems={{ xs: 'initial', md: 'center' }}
            gap={2}
          >
            <Typography>{selection.length} data selected</Typography>
            <Box display="flex" gap={2}>
              {project?.rolePermissions?.TASK?.update && (
                <>
                  <TaskChangeStatusBulk
                    projectId={project!.shortId}
                    sprintId={sprint!.shortId}
                    taskIds={selection}
                    callback={handleCallbackBulkStatus}
                  />
                  {/* <TaskMoveSprint
                  sprintList={sprintList}
                  sprintId={sprint!.shortId}
                  callback={handleCallbackBulkStatus}
                /> */}
                </>
              )}
            </Box>
          </Box>
          <Box sx={{ height: 20 }} />
        </>
      )}
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
        checkboxSelection={project?.rolePermissions.TASK.update}
        onRowSelectionModelChange={(values) => setSelection(values as string[])}
        rowSelectionModel={selection}
        getRowHeight={() => 45}
        sx={({ palette }) => ({
          '& .MuiDataGrid-cell': {
            borderColor: palette.divider,
          },
        })}
      />
    </>
  );
};

export default TaskTable;
