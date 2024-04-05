// React
import { ReactElement } from 'react';

// Next
import dynamic from 'next/dynamic';

import { authWallWrapper } from '@/common/helper/authWallWrapper';

// Components
import { LayoutDefault } from '@/common/layout';
import LayoutProject from '@/features/projects/layout/LayoutProject';
import PageLoader from '@/common/base/PageLoader';

import { getTask } from '@/features/projects/store/task.api.slice';
import { getProject, getProjects } from '@/features/projects/store/project.api.slice';

const ProjectCreateEditTask = dynamic(() => import('@/features/projects/views/ProjectCreateEditTaskPage'), {
  ssr: false,
  loading: () => <PageLoader />,
});

const ProjectDetailTask = () => <ProjectCreateEditTask category="detail" />;

ProjectDetailTask.getLayout = (page: ReactElement) => {
  return (
    <LayoutDefault>
      <LayoutProject hideMenu content={page} />
    </LayoutDefault>
  );
};

export const getServerSideProps = authWallWrapper(async (context, store) => {
  const { project_id, sprint_id, task_id } = context?.params ?? {};
  if (project_id && sprint_id) {
    await store.dispatch(getProjects.initiate());
    await store.dispatch(getProject.initiate(project_id as string));
    await store.dispatch(
      getTask.initiate({
        ids: { idProject: project_id as string, idSprint: sprint_id as string, idTask: task_id as string },
      }),
    );
  }
  return {
    props: {
      title: 'Detail Task',
    },
  };
});

export default ProjectDetailTask;
