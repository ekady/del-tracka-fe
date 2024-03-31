// React
import { ReactElement } from 'react';

// Next
import dynamic from 'next/dynamic';

import { authWallWrapper } from '@/common/helper/authWallWrapper';

import { LayoutDefault } from '@/common/layout';
import PageLoader from '@/common/base/PageLoader';

const LogActivitiesPage = dynamic(() => import('@/features/logs/views/LogActivitiesPage'), {
  ssr: false,
  loading: () => <PageLoader />,
});

const LogActivities = () => <LogActivitiesPage />;

LogActivities.getLayout = (page: ReactElement) => {
  return <LayoutDefault>{page}</LayoutDefault>;
};

export const getServerSideProps = authWallWrapper(async () => {
  return {
    props: {
      title: 'Log Activities',
    },
  };
});

export default LogActivities;
