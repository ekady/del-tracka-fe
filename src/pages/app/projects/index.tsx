// React
import { ReactElement } from 'react';

// Next
import dynamic from 'next/dynamic';

import { authWallWrapper } from '@/common/helper/authWallWrapper';

// Components
import { LayoutDefault } from '@/common/layout';
import LayoutProject from '@/features/projects/layout/LayoutProject';
import PageLoader from '@/common/base/PageLoader';

const ProjectBlank = dynamic(() => import('@/features/projects/views/ProjectBlankPage'), {
  ssr: false,
  loading: () => <PageLoader />,
});

const ProjectPage = () => <ProjectBlank />;

ProjectPage.getLayout = (page: ReactElement) => {
  return (
    <LayoutDefault>
      <LayoutProject hideMenu isMenu content={page} />
    </LayoutDefault>
  );
};

export const getServerSideProps = authWallWrapper(async () => {
  return {
    props: {
      title: 'Project',
    },
  };
});

export default ProjectPage;
