// React
import type { ReactElement } from 'react';

// Components
import { LayoutDefault } from '@/common/layout';
import ProjectIssueDetail from '@/features/projects/components/ProjectIssueDetail';
import LayoutProject from '@/features/projects/layout/LayoutProject';

const ProjectSprintNewIssuePage = () => {
  return <ProjectIssueDetail category="create" />;
};

ProjectSprintNewIssuePage.getLayout = (page: ReactElement) => {
  return (
    <LayoutDefault>
      <LayoutProject hideMenu content={page} />
    </LayoutDefault>
  );
};

export default ProjectSprintNewIssuePage;
