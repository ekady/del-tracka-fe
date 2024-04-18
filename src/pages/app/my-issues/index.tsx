// React
import { ReactElement } from 'react';

// Next
import dynamic from 'next/dynamic';

import { authWallWrapper } from '@/common/helper/authWallWrapper';

import { LayoutDefault } from '@/common/layout';
import PageLoader from '@/common/base/PageLoader';

const MyIssuesPage = dynamic(() => import('@/features/my-issues/views/MyIssuesPage'), {
  ssr: false,
  loading: () => <PageLoader />,
});

const MyIssues = () => <MyIssuesPage />;

MyIssues.getLayout = (page: ReactElement) => {
  return <LayoutDefault>{page}</LayoutDefault>;
};

export const getServerSideProps = authWallWrapper(async () => {
  return {
    props: {
      title: 'My Tasks',
    },
  };
});

export default MyIssues;
