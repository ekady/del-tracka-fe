// React
import { ReactElement } from 'react';

// Next
import dynamic from 'next/dynamic';

import { authWallWrapper } from '@/common/helper/authWallWrapper';

import { LayoutDefault } from '@/common/layout';
import PageLoader from '@/common/base/PageLoader';

const DashboardPage = dynamic(() => import('@/features/dashboard/views/DashboardPage'), {
  ssr: false,
  loading: () => <PageLoader />,
});

const Dashboard = () => <DashboardPage />;

Dashboard.getLayout = (page: ReactElement) => {
  return <LayoutDefault>{page}</LayoutDefault>;
};

export const getServerSideProps = authWallWrapper(async () => {
  return {
    props: {
      title: 'Dashboard',
    },
  };
});

export default Dashboard;
