// React
import { ReactElement } from 'react';

// Next
import dynamic from 'next/dynamic';

// Components
import { LayoutDefault } from '@/common/layout';
import LayoutProject from '@/features/projects/layout/LayoutProject';
import PageLoader from '@/common/base/PageLoader';

import { authWallWrapper } from '@/common/helper/authWallWrapper';
import { getProject, getProjects } from '@/features/projects/store/project.api.slice';
import handleErrorSSr from '@/common/helper/handleErrorSSr';

import { IResponseError } from '@/common/types';

const ProjectSetting = dynamic(() => import('@/features/projects/views/ProjectSettingPage'), {
  ssr: false,
  loading: () => <PageLoader />,
});

const ProjectSettingPage = () => <ProjectSetting />;

ProjectSettingPage.getLayout = (page: ReactElement) => {
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
    const dispatches = [store.dispatch(getProject.initiate(projectId))];
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
      title: 'Project Setting',
    },
  };
});

export default ProjectSettingPage;
