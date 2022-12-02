// Next
import Link from 'next/link';
import { useRouter } from 'next/router';

// MUI Components
import { Box, Button } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

// MUI Icons
import { AddCircleOutlined } from '@mui/icons-material';

// Toast
import { toast } from 'react-toastify';

// Local Component
import { DataTable, TableAction, TableCellLevel, TableCellStatus, TableHeader } from '@/common/base';
import ProjectTaskChangeStatus from './ProjectTaskChangeStatus';

// Types
import { ITableAndSearchProps } from '@/common/types';
import { ITaskResponse } from '@/features/projects/interfaces';
import { LevelType } from '@/common/constants/level';
import { StatusType } from '@/common/constants/status';
import { ProjectIds } from '@/features/projects/store/project.api.slice';

// Hooks
import { useUpdateStatusTaskMutation } from '@/features/projects/store/task.api.slice';
import useProjectId from '@/features/projects/hooks/useProjectId';

const ProjectTaskTable = ({ SearchProps, TableProps }: ITableAndSearchProps) => {
  const router = useRouter();
  const { data: projectData } = useProjectId();
  const [updateTaskStatus] = useUpdateStatusTaskMutation();

  const handleChangeStatus =
    (item: ITaskResponse) =>
    async (status: string): Promise<void> => {
      try {
        const ids: ProjectIds = {
          idProject: router.query.project_id as string,
          idSprint: router.query.sprint_id as string,
          idTask: item.shortId,
        };
        const payload = { status };
        const data = await updateTaskStatus({ ids, payload });
        if ('data' in data) toast.success('Task Status updated successfully');
      } catch (_) {
        //
      }
    };

  const renderCellStatus = (params: GridRenderCellParams<string, ITaskResponse, string>) => (
    <TableCellStatus
      SelectOption={
        <ProjectTaskChangeStatus currentStatus={params.value ?? ''} handleChange={handleChangeStatus(params.row)} />
      }
      status={params.value as StatusType}
    />
  );
  const renderCellLevel = (params: GridRenderCellParams<string>) => (
    <TableCellLevel level={params.value as LevelType} />
  );
  const renderCellAction = () => (
    <TableAction
      hideDelete={!projectData?.data.rolePermissions.TASK.delete}
      hideEdit={!projectData?.data.rolePermissions.TASK.update}
      hideView={!projectData?.data.rolePermissions.TASK.read}
    />
  );

  const tableHeaders: GridColDef<ITaskResponse, string>[] = [
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
  ];

  const buttonAddTask = (
    <Link href={`${router.asPath}/new`} passHref>
      <Button variant="contained" color="primary" startIcon={<AddCircleOutlined />}>
        Add New Task
      </Button>
    </Link>
  );

  return (
    <>
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
