// React
import { ReactElement } from 'react';

// Next
import dynamic from 'next/dynamic';

import { authWallWrapper } from '@/common/helper/authWallWrapper';

// Components
import { LayoutDefault } from '@/common/layout';
import LayoutProject from '@/features/projects/layout/LayoutProject';
import PageLoader from '@/common/base/PageLoader';

import { getProject, getProjects } from '@/features/projects/store/project.api.slice';

const ProjectSetting = dynamic(() => import('@/features/projects/views/ProjectSettingPage'), {
  ssr: false,
  loading: () => <PageLoader />,
});

const ProjectSettingPage = () => <ProjectSetting />;

ProjectSettingPage.getLayout = (page: ReactElement) => {
  return (
    <LayoutDefault>
      <LayoutProject hideMenu content={page} />
    </LayoutDefault>
  );
};

export const getServerSideProps = authWallWrapper(async (context, store) => {
  await store.dispatch(getProjects.initiate());
  if (context?.params?.project_id) await store.dispatch(getProject.initiate(context.params.project_id as string));

  return {
    props: {
      title: 'Project Setting',
    },
  };
});

export default ProjectSettingPage;
