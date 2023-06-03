// React
import { ReactElement, useEffect } from 'react';

// Redux
import { skipToken } from '@reduxjs/toolkit/dist/query';

// MUI
import { Box, Typography } from '@mui/material';

// Components
import { LayoutDefault } from '@/common/layout';
import LayoutProject from '@/features/projects/layout/LayoutProject';
import { ProjectTaskFilter, ProjectTaskTable } from '@/features/projects/components';

import { useRouter } from 'next/router';
import { useGetSprintQuery } from '@/features/projects/store/sprint.api.slice';
import { useTableChange } from '@/common/hooks/useTableChange';
import { useLazyGetTasksQuery } from '@/features/projects/store/task.api.slice';
import { useAppDispatch } from '@/common/store';
import { invalidateTags } from '@/features/projects/store/project.api.slice';
import { useProjectBreadcrumb } from '@/features/projects/hooks/useProjectBreadcrumb';

import { ITaskResponse } from '@/features/projects/interfaces';

const ProjectSprintPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(invalidateTags(['Sprint', 'Tasks']));
  }, [dispatch]);

  const router = useRouter();
  const idProject = router.query?.project_id as string;
  const idSprint = router.query?.sprint_id as string;

  const { onFilter, onLimitPage, onSearch, onSort, tableOption } = useTableChange();
  const { data: sprintInfo, isFetching: isSprintInfoFetching } = useGetSprintQuery(
    idProject && idSprint ? { idProject, idSprint } : skipToken,
  );
  const [getTasks, { data: issuesData, isFetching: isTasksFetching }] = useLazyGetTasksQuery();

  useProjectBreadcrumb({
    '[project_id]': sprintInfo?.data.project?.name ?? '',
    '[sprint_id]': sprintInfo?.data.name ?? '',
  });

  useEffect(() => {
    if (idProject && idSprint) {
      getTasks({ ids: { idProject, idSprint }, params: tableOption }).catch(() => {
        //
      });
    }
  }, [getTasks, idProject, idSprint, tableOption]);

  return (
    <>
      <Box>
        <Typography variant="h6" gutterBottom>
          {isSprintInfoFetching ? '-' : sprintInfo?.data.name}
        </Typography>
        <Typography>{isSprintInfoFetching ? `Sprint ${sprintInfo?.data.name}` : '-'}</Typography>
      </Box>
      <Box height={25} />
      <Box>
        <ProjectTaskFilter onChange={onFilter} />
        <Box sx={{ height: 40 }} />
        <ProjectTaskTable
          SearchProps={{ onChange: onSearch }}
          TableProps={{
            getRowId: (row: ITaskResponse) => row._id,
            rows: issuesData?.data.data ?? [],
            paginationMode: 'server',
            rowCount: issuesData?.data.pagination.total ?? 0,
            loading: isTasksFetching,
            onSortModelChange: onSort,
            onPaginationModelChange: (model) => {
              onLimitPage('limit', model.pageSize);
              onLimitPage('page', model.page + 1);
            },
          }}
        />
      </Box>
    </>
  );
};

ProjectSprintPage.getLayout = (page: ReactElement) => {
  return (
    <LayoutDefault>
      <LayoutProject hideMenu content={page} />
    </LayoutDefault>
  );
};

export default ProjectSprintPage;
