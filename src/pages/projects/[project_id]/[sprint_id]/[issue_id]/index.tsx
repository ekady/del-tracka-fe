// React
import type { ReactElement } from 'react';

// Components
import { LayoutDefault } from '@/common/layout';
import ProjectIssueDetail from '@/features/Projects/components/ProjectIssueDetail';
import LayoutProject from '@/features/Projects/layout/LayoutProject';

const ProjectSprintIssuePage = () => {
  return <ProjectIssueDetail category="detail" />;
};

ProjectSprintIssuePage.getLayout = (page: ReactElement) => {
  return (
    <LayoutDefault>
      <LayoutProject hideMenu content={page} />
    </LayoutDefault>
  );
};

export default ProjectSprintIssuePage;
