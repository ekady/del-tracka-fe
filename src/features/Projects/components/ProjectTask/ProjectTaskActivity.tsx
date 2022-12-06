import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { skipToken } from '@reduxjs/toolkit/dist/query';

import { useAppDispatch } from '@/common/store';
import { Logs } from '@/features/logs/components';
import { invalidateTags } from '@/features/projects/store/project.api.slice';
import { useGetTaskActivitiesQuery } from '@/features/projects/store/task.api.slice';

const ProjectTaskActivity = () => {
  const { query } = useRouter();
  const idProject = query.project_id as string;
  const idSprint = query.sprint_id as string;
  const idTask = query.task_id as string;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(invalidateTags(['TaskActivities']));
  }, [dispatch]);

  const { data, isLoading, isFetching } = useGetTaskActivitiesQuery(
    idProject && idSprint && idTask ? { idProject, idSprint, idTask } : skipToken,
  );

  return (
    <Logs TableProps={{ rows: data?.data ?? [], loading: isLoading || isFetching, getRowId: (row) => row.createdAt }} />
  );
};

export default ProjectTaskActivity;
