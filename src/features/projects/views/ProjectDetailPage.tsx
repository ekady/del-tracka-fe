// React
import { useEffect } from 'react';

// Redux
import { skipToken } from '@reduxjs/toolkit/dist/query';

// MUI
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import {
  ProjectDetailTitle,
  ProjectOverview,
  ProjectOverviewActivity,
  ProjectOverviewSprint,
} from '@/features/projects/components';

import STATUS from '@/common/constants/status';

import { useAppDispatch } from '@/common/store';
import useProjectId from '@/features/projects/hooks/useProjectId';
import { invalidateTags, useGetProjectStatsQuery } from '@/features/projects/store/project.api.slice';
import { useProjectBreadcrumb } from '@/features/projects/hooks/useProjectBreadcrumb';

const ProjectDetailPage = () => {
  const dispatch = useAppDispatch();
  const { data, projectId } = useProjectId();
  const { data: projectStat } = useGetProjectStatsQuery(projectId ?? skipToken);
  const theme = useTheme();
  const lgAndUp = useMediaQuery(theme.breakpoints.up('lg'));

  useEffect(() => {
    dispatch(invalidateTags(['ProjectStats']));
  }, [dispatch]);

  useProjectBreadcrumb({ '[project_id]': data?.data?.name ?? '' });

  return (
    <>
      <Grid container gap={2} justifyContent={{ xs: 'start', sm: 'space-between' }}>
        <ProjectDetailTitle
          title={data?.data?.name ?? ''}
          description={data?.data?.description}
          canAccessSettings={data?.data?.rolePermissions.PROJECT.update || data?.data?.rolePermissions.MEMBER.update}
        />
      </Grid>
      <Box sx={{ height: 40 }} />
      <Grid container gap={1} columns={15} justifyContent={{ xs: 'center', sm: 'start' }}>
        <ProjectOverview {...STATUS.OPEN} value={projectStat?.OPEN ?? 0} />
        <ProjectOverview {...STATUS.IN_PROGRESS} value={projectStat?.IN_PROGRESS ?? 0} />
        <ProjectOverview {...STATUS.REVIEW} value={projectStat?.REVIEW ?? 0} />
        <ProjectOverview {...STATUS.READY_FOR_TEST} value={projectStat?.READY_FOR_TEST ?? 0} />
        <ProjectOverview {...STATUS.FAILED} value={projectStat?.FAILED ?? 0} />
        <ProjectOverview {...STATUS.CLOSED} value={projectStat?.CLOSED ?? 0} />
        <ProjectOverview {...STATUS.HOLD} value={projectStat?.HOLD ?? 0} />
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

export default ProjectDetailPage;
