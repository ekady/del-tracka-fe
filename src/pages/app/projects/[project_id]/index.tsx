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

import { ProjectRoles } from '@/features/projects/constant/role';
import STATUS from '@/common/constants/status';

import useProjectId from '@/features/projects/hooks/useProjectId';

const ProjecOverviewDetailPage = () => {
  const { data, isFetching, isLoading } = useProjectId();
  const theme = useTheme();
  const lgAndUp = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <>
      <Grid container gap={2} justifyContent={{ xs: 'start', sm: 'space-between' }}>
        <ProjectDetailTitle
          title={data?.name ?? ''}
          description={data?.description}
          canAccessSettings={data?.asRole === ProjectRoles.OWNER || data?.asRole === ProjectRoles.MAINTAINER}
        />
      </Grid>
      <Box sx={{ height: 40 }} />
      <Grid container gap={1} columns={13} justifyContent={{ xs: 'center', sm: 'space-between' }}>
        <ProjectOverview {...STATUS.OPEN} value={data?.totalOpen ?? 0} />
        <ProjectOverview {...STATUS.IN_PROGRESS} value={data?.totalInProgress ?? 0} />
        <ProjectOverview {...STATUS.REVIEW} value={data?.totalReview ?? 0} />
        <ProjectOverview {...STATUS.CLOSE} value={data?.totalClose ?? 0} />
      </Grid>
      <Box sx={{ height: 50 }} />
      <Grid container gap={2} justifyContent={{ xs: 'center', md: 'space-between' }}>
        <Grid item xs={12}>
          <ProjectOverviewSprint sprints={data?.sprints ?? []} loading={isLoading || isFetching} />
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
