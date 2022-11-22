// React
import { ReactElement, useEffect } from 'react';

// MUI
import { Box, Typography } from '@mui/material';

// Components
import { LayoutDefault } from '@/common/layout';
import LayoutProject from '@/features/projects/layout/LayoutProject';
import { ProjectIssueFilter, ProjectIssueTable } from '@/features/projects/components';

import { useRouter } from 'next/router';
import { useGetSprintQuery } from '@/features/projects/store/sprint.api.slice';
import { useTableChange } from '@/common/hooks/useTableChange';
import { useLazyGetTasksQuery } from '@/features/projects/store/task.api.slice';

const ProjectSprintPage = () => {
  const router = useRouter();
  const idProject = router.query?.project_id as string;
  const idSprint = router.query?.sprint_id as string;

  const { onFilter, onLimitPage, onSearch, onSort, tableOption } = useTableChange();
  const { data: sprintInfo, isFetching: isSprintInfoFetching } = useGetSprintQuery({ idProject, idSprint });
  const [getTasks, { data: issuesData, isFetching: isIssuesFetching }] = useLazyGetTasksQuery();

  useEffect(() => {
    const response = getTasks({ ids: { idProject, idSprint }, params: tableOption });
    return () => {
      response.abort();
    };
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
        <ProjectIssueFilter onChange={onFilter} />
        <Box sx={{ height: 40 }} />
        <ProjectIssueTable
          SearchProps={{ onChange: onSearch }}
          TableProps={{
            getRowId: (row) => row._id,
            rows: issuesData?.data ?? [],
            paginationMode: 'client',
            rowCount: undefined,
            loading: isIssuesFetching,
            onSortModelChange: onSort,
            onPageSizeChange: (limit) => onLimitPage('limit', limit),
            onPageChange: (page) => onLimitPage('page', page),
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
