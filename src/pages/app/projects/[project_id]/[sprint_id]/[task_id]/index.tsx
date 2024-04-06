// React
import { ReactElement } from 'react';

// Next
import dynamic from 'next/dynamic';

// Components
import { LayoutDefault } from '@/common/layout';
import LayoutProject from '@/features/projects/layout/LayoutProject';
import PageLoader from '@/common/base/PageLoader';

import { authWallWrapper } from '@/common/helper/authWallWrapper';
import { getTask } from '@/features/projects/store/task.api.slice';
import { getProject, getProjects } from '@/features/projects/store/project.api.slice';
import handleErrorSSr from '@/common/helper/handleErrorSSr';

import { IResponseError } from '@/common/types';

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

  try {
    if (!project_id || !sprint_id || !task_id) throw new Error('500');

    await store.dispatch(getProjects.initiate());
    const dispatches = [
      store.dispatch(getProjects.initiate()),
      store.dispatch(getProject.initiate(project_id as string)),
      store.dispatch(
        getTask.initiate({
          ids: { idProject: project_id as string, idSprint: sprint_id as string, idTask: task_id as string },
        }),
      ),
    ];
    const responses = await Promise.all(dispatches);
    const rejected = responses.find((response) => response.status !== 'fulfilled');

    if (rejected && rejected?.error) {
      const dataError: IResponseError =
        'data' in rejected.error ? (rejected.error.data as IResponseError) : { statusCode: 500, errors: [] };
      throw new Error(`${dataError?.statusCode}`);
    }
  } catch (err) {
    return handleErrorSSr(err as Error);
  }

  return {
    props: {
      title: 'Detail Task',
    },
  };
});

export default ProjectDetailTask;
