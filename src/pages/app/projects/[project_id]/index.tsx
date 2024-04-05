// React
import { ReactElement } from 'react';

// Next
import dynamic from 'next/dynamic';

import { authWallWrapper } from '@/common/helper/authWallWrapper';

// Components
import { LayoutDefault } from '@/common/layout';
import LayoutProject from '@/features/projects/layout/LayoutProject';
import PageLoader from '@/common/base/PageLoader';
import {
  getProject,
  getProjectActivities,
  getProjects,
  getProjectStats,
} from '@/features/projects/store/project.api.slice';
import { getSprint, getSprintInfo } from '@/features/projects/store/sprint.api.slice';

const ProjectDetail = dynamic(() => import('@/features/projects/views/ProjectDetailPage'), {
  ssr: false,
  loading: () => <PageLoader />,
});

const ProjectDetailPage = () => <ProjectDetail />;

ProjectDetailPage.getLayout = (page: ReactElement) => {
  return (
    <LayoutDefault>
      <LayoutProject hideMenu content={page} />
    </LayoutDefault>
  );
};

export const getServerSideProps = authWallWrapper(async (context, store) => {
  await store.dispatch(getProjects.initiate());

  const projectId = context?.params?.project_id as string;
  if (projectId) {
    await store.dispatch(getProject.initiate(projectId));
    await store.dispatch(getProjectStats.initiate(projectId));
    await store.dispatch(getSprintInfo.initiate({ idProject: projectId, idSprint: '' }));
    await store.dispatch(getSprint.initiate({ idProject: projectId, idSprint: '' }));
    await store.dispatch(getProjectActivities.initiate({ id: projectId, params: {} }));
  }
  return {
    props: {
      title: 'Project',
    },
  };
});

export default ProjectDetailPage;
