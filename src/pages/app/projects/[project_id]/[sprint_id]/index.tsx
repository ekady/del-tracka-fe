// React
import { ReactElement } from 'react';

// Next
import dynamic from 'next/dynamic';

import { authWallWrapper } from '@/common/helper/authWallWrapper';

// Components
import { LayoutDefault } from '@/common/layout';
import LayoutProject from '@/features/projects/layout/LayoutProject';
import PageLoader from '@/common/base/PageLoader';

import { getSprint } from '@/features/projects/store/sprint.api.slice';
import { getProject, getProjects } from '@/features/projects/store/project.api.slice';

const ProjectSprint = dynamic(() => import('@/features/projects/views/ProjectSprintPage'), {
  ssr: false,
  loading: () => <PageLoader />,
});

const ProjectSprintPage = () => <ProjectSprint />;

ProjectSprintPage.getLayout = (page: ReactElement) => {
  return (
    <LayoutDefault>
      <LayoutProject hideMenu content={page} />
    </LayoutDefault>
  );
};

export const getServerSideProps = authWallWrapper(async (context, store) => {
  const { project_id, sprint_id } = context?.params ?? {};
  if (project_id && sprint_id) {
    await store.dispatch(getProjects.initiate());
    await store.dispatch(getProject.initiate(project_id as string));
    await store.dispatch(getSprint.initiate({ idProject: project_id as string, idSprint: sprint_id as string }));
  }
  return {
    props: {
      title: 'Sprint Task',
    },
  };
});

export default ProjectSprintPage;
