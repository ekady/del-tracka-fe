// React
import { ReactElement, useEffect } from 'react';

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
import { ITaskResponse } from '@/features/projects/interfaces';
import { skipToken } from '@reduxjs/toolkit/dist/query';

const ProjectSprintPage = () => {
  const router = useRouter();
  const idProject = router.query?.project_id as string;
  const idSprint = router.query?.sprint_id as string;

  const { onFilter, onLimitPage, onSearch, onSort, tableOption } = useTableChange();
  const { data: sprintInfo, isFetching: isSprintInfoFetching } = useGetSprintQuery(
    idProject && idSprint ? { idProject, idSprint } : skipToken,
  );
  const [getTasks, { data: issuesData, isFetching: isTasksFetching }] = useLazyGetTasksQuery();

  useEffect(() => {
    getTasks({ ids: { idProject, idSprint }, params: tableOption });
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
            rowCount: issuesData?.data.pagination.total || 0,
            loading: isTasksFetching,
            onSortModelChange: onSort,
            onPageSizeChange: (limit: number) => onLimitPage('limit', limit),
            onPageChange: (page: number) => onLimitPage('page', page + 1),
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
