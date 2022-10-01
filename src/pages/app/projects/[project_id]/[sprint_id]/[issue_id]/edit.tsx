// React
import type { ReactElement } from 'react';

// Components
import { LayoutDefault } from '@/common/layout';
import ProjectIssueDetail from '@/features/projects/components/ProjectIssueDetail';
import LayoutProject from '@/features/projects/layout/LayoutProject';

const ProjectSprintIssuePage = () => {
  return <ProjectIssueDetail category="edit" />;
};

ProjectSprintIssuePage.getLayout = (page: ReactElement) => {
  return (
    <LayoutDefault>
      <LayoutProject hideMenu content={page} />
    </LayoutDefault>
  );
};

export default ProjectSprintIssuePage;
