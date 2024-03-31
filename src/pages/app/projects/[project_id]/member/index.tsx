// React
import { ReactElement } from 'react';

// Next
import dynamic from 'next/dynamic';

import { authWallWrapper } from '@/common/helper/authWallWrapper';

// Components
import { LayoutDefault } from '@/common/layout';
import LayoutProject from '@/features/projects/layout/LayoutProject';
import PageLoader from '@/common/base/PageLoader';

const ProjectMember = dynamic(() => import('@/features/projects/views/ProjectMemberPage'), {
  ssr: false,
  loading: () => <PageLoader />,
});

const ProjectMemberPage = () => <ProjectMember />;

ProjectMemberPage.getLayout = (page: ReactElement) => {
  return (
    <LayoutDefault>
      <LayoutProject hideMenu content={page} />
    </LayoutDefault>
  );
};

export const getServerSideProps = authWallWrapper(async () => {
  return {
    props: {
      title: 'Project Member',
    },
  };
});

export default ProjectMemberPage;
