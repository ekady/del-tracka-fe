// React
import { ReactElement } from 'react';

// MUI
import { Box, Grid, useMediaQuery, useTheme } from '@mui/material';

// Components
import { LayoutDefault } from '@/common/layout';
import LayoutProject from '@/features/projects/layout/LayoutProject';
import {
  ProjectDetailTitle,
  ProjectOverview,
  ProjectOverviewActivity,
  ProjectOverviewSprint,
} from '@/features/projects/components';

import STATUS from '@/common/constants/status';

import useProjectId from '@/features/projects/hooks/useProjectId';
import { useGetProjectStatsQuery } from '@/features/projects/store/project.api.slice';
import { skipToken } from '@reduxjs/toolkit/dist/query';

const ProjecOverviewDetailPage = () => {
  const { data, projectId } = useProjectId();
  const { data: projectStat } = useGetProjectStatsQuery(projectId ?? skipToken);
  const theme = useTheme();
  const lgAndUp = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <>
      <Grid container gap={2} justifyContent={{ xs: 'start', sm: 'space-between' }}>
        <ProjectDetailTitle
          title={data?.data?.name ?? ''}
          description={data?.data?.description}
          canAccessSettings={data?.data?.rolePermissions.PROJECT.update}
        />
      </Grid>
      <Box sx={{ height: 40 }} />
      <Grid container gap={1} columns={13} justifyContent={{ xs: 'center', sm: 'space-between' }}>
        <ProjectOverview {...STATUS.OPEN} value={projectStat?.OPEN ?? 0} />
        <ProjectOverview {...STATUS.IN_PROGRESS} value={projectStat?.IN_PROGRESS ?? 0} />
        <ProjectOverview {...STATUS.REVIEW} value={projectStat?.REVIEW ?? 0} />
        <ProjectOverview {...STATUS.READY_FOR_TEST} value={projectStat?.READY_FOR_TEST ?? 0} />
        <ProjectOverview {...STATUS.FAILED} value={projectStat?.FAILED ?? 0} />
        <ProjectOverview {...STATUS.CLOSED} value={projectStat?.CLOSED ?? 0} />
      </Grid>
      <Box sx={{ height: 50 }} />
      <Grid container gap={2} justifyContent={{ xs: 'center', md: 'space-between' }}>
        <Grid item xs={12}>
          <ProjectOverviewSprint />
        </Grid>
        <Grid item xs={12} sx={{ pt: lgAndUp ? 0 : 5 }}>
          <ProjectOverviewActivity />
        </Grid>
      </Grid>
    </>
  );
};

ProjecOverviewDetailPage.getLayout = (page: ReactElement) => {
  return (
    <LayoutDefault>
      <LayoutProject hideMenu content={page} />
    </LayoutDefault>
  );
};

export default ProjecOverviewDetailPage;
