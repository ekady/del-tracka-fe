'use client';

// Next
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import AddCircleOutlined from '@mui/icons-material/AddCircleOutlined';
import Button from '@mui/material/Button';

import TableHeader from '@/app/_common/base/TableHeader';
import { useTableChange } from '@/app/_common/hooks/useTableChange.hook';
import { IProjectWithPermissions, ISprintResponse } from '@/app/app/projects/_interfaces';

interface ITaskListHeaderProps {
  project: IProjectWithPermissions | null;
  sprint: ISprintResponse | null;
}

const TaskListHeader = ({ project, sprint }: ITaskListHeaderProps) => {
  const { onSearchChange } = useTableChange();
  const searchParams = useSearchParams();

  return (
    <TableHeader
      isUsingSearch
      TextFieldProps={{ onChange: onSearchChange, defaultValue: searchParams.get('search') ?? '' }}
    >
      {project?.rolePermissions.TASK.create ? (
        <Link href={`/app/projects/${project?.shortId}/${sprint?.shortId}/new`} passHref>
          <Button variant="contained" color="primary" startIcon={<AddCircleOutlined />}>
            Add New Task
          </Button>
        </Link>
      ) : (
        'Task List'
      )}
    </TableHeader>
  );
};

export default TaskListHeader;
