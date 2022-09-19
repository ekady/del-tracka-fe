// React
import { ReactElement, useEffect } from 'react';

// MUI
import { Box, Typography } from '@mui/material';

// Components
import { LayoutDefault } from '@/common/layout';
import LayoutProject from '@/features/Projects/layout/LayoutProject';
import { ProjectIssueFilter, ProjectIssueTable } from '@/features/Projects/components';

import { useRouter } from 'next/router';
import { useGetSprintInfoQuery, useLazyGetSprintIssuesQuery } from '@/features/Projects/store/project.api.slice';
import { useTableChange } from '@/common/hooks/useTableChange';

const ProjectSprintPage = () => {
  const router = useRouter();
  const idProject = router.query?.project_id as string;
  const idSprint = router.query?.sprint_id as string;

  const { onFilter, onLimitPage, onSearch, onSort, tableOption } = useTableChange();
  const { data: sprintInfo, isFetching: isSprintInfoFetching } = useGetSprintInfoQuery({ idProject, idSprint });
  const [getIssues, { data: issuesData, isFetching: isIssuesFetching }] = useLazyGetSprintIssuesQuery();

  useEffect(() => {
    const response = getIssues({ id: { idSprint, idProject }, body: tableOption });
    return () => {
      response.abort();
    };
  }, [getIssues, idProject, idSprint, tableOption]);

  return (
    <>
      <Box>
        <Typography variant="h6" gutterBottom>
          {isSprintInfoFetching ? '-' : sprintInfo?.projectName}
        </Typography>
        <Typography>{isSprintInfoFetching ? `Sprint ${sprintInfo?.sprint}` : '-'}</Typography>
      </Box>
      <Box height={25} />
      <Box>
        <ProjectIssueFilter onChange={onFilter} />
        <Box sx={{ height: 40 }} />
        <ProjectIssueTable
          SearchProps={{ onChange: onSearch }}
          TableProps={{
            rows: issuesData?.content ?? [],
            rowCount: issuesData?.totalContent ?? 0,
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
