// React
import { ReactElement } from 'react';

// Next
import dynamic from 'next/dynamic';

import { authWallWrapper } from '@/common/helper/authWallWrapper';

import { LayoutDefault } from '@/common/layout';
import PageLoader from '@/common/base/PageLoader';

import {
  getTaskProjectTotal,
  getTaskStatusAll,
  getTaskStatusUser,
  getUserActivities,
} from '@/features/dashboard/store/dashboard.api.slice';

const DashboardPage = dynamic(() => import('@/features/dashboard/views/DashboardPage'), {
  ssr: false,
  loading: () => <PageLoader />,
});

const Dashboard = () => <DashboardPage />;

Dashboard.getLayout = (page: ReactElement) => {
  return <LayoutDefault>{page}</LayoutDefault>;
};

export const getServerSideProps = authWallWrapper(async (_, store) => {
  await store.dispatch(getTaskProjectTotal.initiate());
  await store.dispatch(getTaskStatusUser.initiate());
  await store.dispatch(getTaskStatusAll.initiate());
  await store.dispatch(getUserActivities.initiate());

  return {
    props: {
      title: 'Dashboard',
    },
  };
});

export default Dashboard;
