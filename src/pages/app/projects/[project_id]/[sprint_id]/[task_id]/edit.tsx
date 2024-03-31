// React
import { ReactElement } from 'react';

// Next
import dynamic from 'next/dynamic';

import { authWallWrapper } from '@/common/helper/authWallWrapper';

// Components
import { LayoutDefault } from '@/common/layout';
import LayoutProject from '@/features/projects/layout/LayoutProject';
import PageLoader from '@/common/base/PageLoader';

const ProjectCreateEditTask = dynamic(() => import('@/features/projects/views/ProjectCreateEditTaskPage'), {
  ssr: false,
  loading: () => <PageLoader />,
});

const ProjectEditTask = () => <ProjectCreateEditTask category="edit" />;

ProjectEditTask.getLayout = (page: ReactElement) => {
  return (
    <LayoutDefault>
      <LayoutProject hideMenu content={page} />
    </LayoutDefault>
  );
};

export const getServerSideProps = authWallWrapper(async () => {
  return {
    props: {
      title: 'Edit Task',
    },
  };
});

export default ProjectEditTask;
