// React
import { ReactElement } from 'react';

// Next
import dynamic from 'next/dynamic';

import { authWallWrapper } from '@/common/helper/authWallWrapper';
import { getProjects } from '@/features/projects/store/project.api.slice';
import handleErrorSSr from '@/common/helper/handleErrorSSr';

// Components
import { LayoutDefault } from '@/common/layout';
import LayoutProject from '@/features/projects/layout/LayoutProject';
import PageLoader from '@/common/base/PageLoader';

import { IResponseError } from '@/common/types';

const ProjectBlank = dynamic(() => import('@/features/projects/views/ProjectBlankPage'), {
  ssr: false,
  loading: () => <PageLoader />,
});

const ProjectPage = () => <ProjectBlank />;

ProjectPage.getLayout = (page: ReactElement) => {
  return (
    <LayoutDefault>
      <LayoutProject hideMenu isMenu content={page} />
    </LayoutDefault>
  );
};

export const getServerSideProps = authWallWrapper(async (_, store) => {
  try {
    const response = await store.dispatch(getProjects.initiate());

    if (response && response?.error) {
      const dataError: IResponseError =
        'data' in response.error ? (response.error.data as IResponseError) : { statusCode: 500, errors: [] };
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

export default ProjectPage;
