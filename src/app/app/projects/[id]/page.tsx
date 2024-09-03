import { Metadata } from 'next';

import Link from 'next/link';

import { People, Settings } from '@mui/icons-material';
import { Box, Button, Grid, IconButton, Typography } from '@mui/material';

import TitleWithBreadcrumb from '@/app/_common/base/TitleWithBreadcrumb';
import STATUS from '@/app/_common/constants/status.constant';
import {
  actionFetchProjectActivity,
  actionFetchProjectStats,
  actionFetchSprintList,
} from '@/app/app/projects/[id]/_actions/projectId.action.utils';
import ProjectLogList from '@/app/app/projects/[id]/_components/ProjectLogList';
import SprintList from '@/app/app/projects/[id]/_components/SprintList';
import { IProjectPageProps } from '@/app/app/projects/[id]/_interfaces';

import ProjectStatCard from './_components/ProjectStatCard';
import { actionFetchProject } from '../_actions/project.action.utils';

export async function generateMetadata({ params }: IProjectPageProps): Promise<Metadata> {
  const project = await actionFetchProject(params.id);
  return {
    title: project?.name ?? 'Project',
  };
}

const ProjectPage = async ({ params }: IProjectPageProps) => {
  const project = await actionFetchProject(params.id);
  const projectStat = await actionFetchProjectStats(params.id);
  const sprints = await actionFetchSprintList({ projectId: params.id });
  const logs = await actionFetchProjectActivity(params.id);

  return (
    <>
      <TitleWithBreadcrumb
        title={project?.name ?? 'Project'}
        backTo="/app/projects"
        breadcrumbs={[
          { breadcrumb: 'Project', href: '/app/projects' },
          { breadcrumb: project?.name ?? params.id, href: `/app/projects/${params.id}` },
        ]}
      />
      <Grid container columns={12}>
        <Grid item xs={12} sm={8} order={{ xs: 2, sm: 1 }}>
          <Typography>{project?.description}</Typography>
        </Grid>
        <Grid display={{ xs: 'none', sm: 'block' }} item xs={12} sm={4} textAlign="right" order={2}>
          {project?.rolePermissions?.PROJECT?.update ? (
            <IconButton LinkComponent={Link} href={`/app/projects/${params.id}/settings`} size="small">
              <Settings />
            </IconButton>
          ) : (
            <IconButton LinkComponent={Link} href={`/app/projects/${params.id}/member`} size="small">
              <People />
            </IconButton>
          )}
        </Grid>
        <Grid display={{ xs: 'block', sm: 'none' }} item xs={12} sm={4} textAlign="right" order={1} mb={3}>
          {project?.rolePermissions?.PROJECT?.update ? (
            <Button
              fullWidth
              LinkComponent={Link}
              variant="outlined"
              href={`/app/projects/${params.id}/settings`}
              size="medium"
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
            >
              <Settings /> Settings
            </Button>
          ) : (
            <Button
              fullWidth
              LinkComponent={Link}
              variant="outlined"
              href={`/app/projects/${params.id}/member`}
              size="medium"
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
            >
              <People /> Member
            </Button>
          )}
        </Grid>
      </Grid>

      <Box sx={{ height: 20 }} />
      <Grid container gap={1} columns={15} justifyContent={{ xs: 'center', sm: 'start' }}>
        <ProjectStatCard {...STATUS.OPEN} value={projectStat?.OPEN ?? 0} />
        <ProjectStatCard {...STATUS.IN_PROGRESS} value={projectStat?.IN_PROGRESS ?? 0} />
        <ProjectStatCard {...STATUS.REVIEW} value={projectStat?.REVIEW ?? 0} />
        <ProjectStatCard {...STATUS.READY_FOR_TEST} value={projectStat?.READY_FOR_TEST ?? 0} />
        <ProjectStatCard {...STATUS.FAILED} value={projectStat?.FAILED ?? 0} />
        <ProjectStatCard {...STATUS.CLOSED} value={projectStat?.CLOSED ?? 0} />
        <ProjectStatCard {...STATUS.HOLD} value={projectStat?.HOLD ?? 0} />
      </Grid>

      <Box sx={{ height: 50 }} />
      <SprintList project={project} projectId={params.id} sprints={sprints} />

      <Box sx={{ height: 30 }} />
      <ProjectLogList logs={logs?.data ?? []} />
    </>
  );
};

export default ProjectPage;
