// React
import { ReactElement } from 'react';

// Next
import dynamic from 'next/dynamic';

import { authWallWrapper } from '@/common/helper/authWallWrapper';

// Components
import { LayoutDefault } from '@/common/layout';
import LayoutProject from '@/features/projects/layout/LayoutProject';
import PageLoader from '@/common/base/PageLoader';

import {
  getProject,
  getProjectActivities,
  getProjects,
  getProjectStats,
} from '@/features/projects/store/project.api.slice';
import { getSprint, getSprintInfo } from '@/features/projects/store/sprint.api.slice';

import handleErrorSSr from '@/common/helper/handleErrorSSr';

import { IResponseError } from '@/common/types';

const ProjectDetail = dynamic(() => import('@/features/projects/views/ProjectDetailPage'), {
  ssr: false,
  loading: () => <PageLoader />,
});

const ProjectDetailPage = () => <ProjectDetail />;

ProjectDetailPage.getLayout = (page: ReactElement) => {
  return (
    <LayoutDefault>
      <LayoutProject hideMenu content={page} />
    </LayoutDefault>
  );
};

export const getServerSideProps = authWallWrapper(async (context, store) => {
  const projectId = context?.params?.project_id as string;

  try {
    if (!projectId) throw new Error('500');

    await store.dispatch(getProjects.initiate());
    const dispatches = [
      store.dispatch(getProject.initiate(projectId)),
      store.dispatch(getProjectStats.initiate(projectId)),
      store.dispatch(getSprintInfo.initiate({ idProject: projectId, idSprint: '' })),
      store.dispatch(getSprint.initiate({ idProject: projectId, idSprint: '' })),
      store.dispatch(getProjectActivities.initiate({ id: projectId, params: {} })),
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
      title: 'Project',
    },
  };
});

export default ProjectDetailPage;
