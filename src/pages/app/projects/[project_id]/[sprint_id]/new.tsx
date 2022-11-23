// React
import type { ReactElement } from 'react';

// Components
import { LayoutDefault } from '@/common/layout';
import ProjectTaskDetail from '@/features/projects/components/ProjectTaskDetail';
import LayoutProject from '@/features/projects/layout/LayoutProject';

const ProjectSprintNewTaskPage = () => {
  return <ProjectTaskDetail category="create" />;
};

ProjectSprintNewTaskPage.getLayout = (page: ReactElement) => {
  return (
    <LayoutDefault>
      <LayoutProject hideMenu content={page} />
    </LayoutDefault>
  );
};

export default ProjectSprintNewTaskPage;
