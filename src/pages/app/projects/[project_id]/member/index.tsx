// React
import type { ReactElement } from 'react';

// Components
import { LayoutDefault } from '@/common/layout';
import { ProjectMemberList } from '@/features/projects/components';
import LayoutProject from '@/features/projects/layout/LayoutProject';

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
