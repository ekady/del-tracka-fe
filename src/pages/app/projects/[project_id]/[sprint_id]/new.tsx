// React
import type { ReactElement } from 'react';

// Next
import { useRouter } from 'next/router';

// Components
import { LayoutDefault } from '@/common/layout';
import ProjectTaskDetail from '@/features/projects/components/ProjectTaskDetail';
import LayoutProject from '@/features/projects/layout/LayoutProject';

import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useProjectBreadcrumb } from '@/features/projects/hooks/useProjectBreadcrumb';
import { useGetSprintQuery } from '@/features/projects/store/sprint.api.slice';

const ProjectSprintNewTaskPage = () => {
  const router = useRouter();
  const idProject = router.query?.project_id as string;
  const idSprint = router.query?.sprint_id as string;

  const { data: sprintInfo } = useGetSprintQuery(idProject && idSprint ? { idProject, idSprint } : skipToken);
  useProjectBreadcrumb({
    '[project_id]': sprintInfo?.data.project?.name || '',
    '[sprint_id]': sprintInfo?.data.name || '',
  });
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
