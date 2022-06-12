// React
import type { ReactElement } from 'react';

// Components
import { LayoutDefault } from '@/common/layout';
import { ProjectMemberList } from '@/features/Projects/components';
import LayoutProject from '@/features/Projects/layout/LayoutProject';

const ProjectMemberPage = () => {
  return <ProjectMemberList hideSelectOption />;
};

ProjectMemberPage.getLayout = (page: ReactElement) => {
  return (
    <LayoutDefault>
      <LayoutProject hideMenu content={page} />
    </LayoutDefault>
  );
};

export default ProjectMemberPage;
