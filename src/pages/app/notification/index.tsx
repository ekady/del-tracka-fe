// React
import { ReactElement } from 'react';

// Next
import dynamic from 'next/dynamic';

import { authWallWrapper } from '@/common/helper/authWallWrapper';

import { LayoutDefault } from '@/common/layout';
import PageLoader from '@/common/base/PageLoader';

const NotificationsPage = dynamic(() => import('@/features/notifications/views/NotificationsPage'), {
  ssr: false,
  loading: () => <PageLoader />,
});

const Notifications = () => <NotificationsPage />;

Notifications.getLayout = (page: ReactElement) => {
  return <LayoutDefault>{page}</LayoutDefault>;
};

export const getServerSideProps = authWallWrapper(async () => {
  return {
    props: {
      title: 'Notifications',
    },
  };
});

export default Notifications;
