import { useCallback, useEffect, useMemo } from 'react';

// Next
import Link from 'next/link';

// MUI Components
import { Box, Button } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

// MUI Icons
import { AddCircleOutlined } from '@mui/icons-material';

// Toast
import { toast } from 'react-toastify';

// Local Component
import { BaseDialogAlert, DataTable, TableAction, TableCellLevel, TableCellStatus, TableHeader } from '@/common/base';
import ProjectTaskChangeStatus from './ProjectTaskChangeStatus';

// Types
import { FunctionVoid, FunctionVoidWithParams, ITableAndSearchProps } from '@/common/types';
import { ITaskResponse } from '@/features/projects/interfaces';
import { LevelType } from '@/common/constants/level';
import { StatusType } from '@/common/constants/status';
import { invalidateTags, ProjectIds } from '@/features/projects/store/project.api.slice';

// Hooks
import { useAppDispatch } from '@/common/store';
import useDialogAlert from '@/common/base/BaseDialogAlert/useDialogAlert';
import { useDeleteTaskMutation, useUpdateStatusTaskMutation } from '@/features/projects/store/task.api.slice';
import useProjectId from '@/features/projects/hooks/useProjectId';

const ProjectTaskTable = ({ SearchProps, TableProps }: ITableAndSearchProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(invalidateTags(['Tasks']));
  }, [dispatch]);

  const { data: projectData, router } = useProjectId();
  const [updateTaskStatus] = useUpdateStatusTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const { dialogAlertOpt, openDialogWarning, closeDialogAlert } = useDialogAlert();

  const handleChangeStatus = useCallback(
    (item: ITaskResponse) =>
      async (status: string): Promise<void> => {
        try {
          const ids: ProjectIds = {
            idProject: item.project.shortId,
            idSprint: item.stage.shortId,
            idTask: item.shortId,
          };
          const payload = { status };
          const data = await updateTaskStatus({ ids, payload });
          if ('data' in data && data.data) toast.success('Task Status updated successfully');
        } catch (_) {
          //
        }
      },
    [updateTaskStatus],
  );

  const handleDeleteTask = useCallback(
    async (item: ITaskResponse) => {
      try {
        const data = await deleteTask({
          idProject: item.project.shortId,
          idSprint: item.stage.shortId,
          idTask: item.shortId,
        });
        if ('data' in data && data.data) {
          toast.success('Task deleted successfully');
          closeDialogAlert();
        }
      } catch (_) {
        //
      }
    },
    [closeDialogAlert, deleteTask],
  );

  const openDialogDeleteWarning = useCallback(
    (item: ITaskResponse) => {
      openDialogWarning('Confirmation', 'Are you sure you want to delete this task?', {
        type: 'warning',
        handleOk: (() => handleDeleteTask(item)) as FunctionVoid,
        handleCancel: closeDialogAlert,
      });
    },
    [closeDialogAlert, handleDeleteTask, openDialogWarning],
  );

  const redirectTaskEditDetail = useCallback(
    async (task: ITaskResponse, isEdit = false) => {
      await router.push(
        `/app/projects/${task.project?.shortId}/${task.stage?.shortId}/${task.shortId}${isEdit ? '/edit' : ''}`,
      );
    },
    [router],
  ) as (task: ITaskResponse, isEdit: boolean) => void;

  const renderCellStatus = useCallback(
    (params: GridRenderCellParams<ITaskResponse, string>) => (
      <TableCellStatus
        SelectOption={
          <ProjectTaskChangeStatus
            currentStatus={params.value ?? ''}
            handleChange={handleChangeStatus(params.row) as FunctionVoidWithParams<string>}
          />
        }
        status={params.value as StatusType}
      />
    ),
    [handleChangeStatus],
  );

  const renderCellLevel = useCallback(
    (params: GridRenderCellParams<ITaskResponse>) => <TableCellLevel level={params.value as LevelType} />,
    [],
  );

  const renderCellAction = useCallback(
    ({ row }: GridRenderCellParams<ITaskResponse, string>) => (
      <TableAction
        hideDelete={
          projectData?.data.rolePermissions.TASK.delete === false ||
          (row?.permissions && row?.permissions.delete === false)
        }
        hideEdit={
          projectData?.data.rolePermissions.TASK.update === false ||
          (row?.permissions && row?.permissions.update === false)
        }
        hideView={
          projectData?.data.rolePermissions.TASK.read === false || (row?.permissions && row?.permissions.read === false)
        }
        handleView={() => redirectTaskEditDetail(row, false)}
        handleEdit={() => redirectTaskEditDetail(row, true)}
        handleDelete={() => openDialogDeleteWarning(row)}
      />
    ),
    [
      openDialogDeleteWarning,
      projectData?.data.rolePermissions.TASK.delete,
      projectData?.data.rolePermissions.TASK.read,
      projectData?.data.rolePermissions.TASK.update,
      redirectTaskEditDetail,
    ],
  );

  const tableHeaders: GridColDef<ITaskResponse, string>[] = useMemo<GridColDef<ITaskResponse, string>[]>(
    () => [
      { headerName: 'Main Problem', field: 'title', width: 300 },
      { headerName: 'Feature', field: 'feature', width: 200 },
      { headerName: 'Level', field: 'priority', width: 200, renderCell: renderCellLevel },
      {
        headerName: 'Date Updated',
        field: 'updatedAt',
        width: 200,
        valueFormatter: (val) => (val.value ? new Date(val.value).toLocaleString() : '-'),
      },
      {
        headerName: 'Reporter',
        field: 'reporter',
        valueGetter: ({ row }) => (row.reporter ? `${row.reporter.firstName} ${row.reporter.lastName}` : '-'),
        width: 200,
      },
      {
        headerName: 'Assignee',
        field: 'assignee',
        valueGetter: ({ row }) => (row.assignee ? `${row.assignee.firstName} ${row.assignee.lastName}` : '-'),
      },
      { headerName: 'Status', field: 'status', width: 200, renderCell: renderCellStatus },
      { headerName: 'Action', field: 'action', sortable: false, width: 70, renderCell: renderCellAction },
    ],
    [renderCellAction, renderCellLevel, renderCellStatus],
  );

  const buttonAddTask = (
    <Link href={`${router.asPath}/new`} passHref>
      <Button variant="contained" color="primary" startIcon={<AddCircleOutlined />}>
        Add New Task
      </Button>
    </Link>
  );

  return (
    <>
      <BaseDialogAlert {...dialogAlertOpt} />
      <TableHeader
        header={projectData?.data.rolePermissions.TASK.create ? buttonAddTask : null}
        isUsingSearch
        TextFieldProps={SearchProps}
      />
      <Box sx={{ height: 20 }} />
      <DataTable rows={[]} columns={tableHeaders} {...TableProps} />
    </>
  );
};

export default ProjectTaskTable;
