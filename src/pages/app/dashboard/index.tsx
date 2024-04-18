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
import handleErrorSSr from '@/common/helper/handleErrorSSr';

import { IResponseError } from '@/common/types';

const DashboardPage = dynamic(() => import('@/features/dashboard/views/DashboardPage'), {
  ssr: false,
  loading: () => <PageLoader />,
});

const Dashboard = () => <DashboardPage />;

Dashboard.getLayout = (page: ReactElement) => {
  return <LayoutDefault>{page}</LayoutDefault>;
};

export const getServerSideProps = authWallWrapper(async (_, store) => {
  try {
    const dispatches = [
      store.dispatch(getTaskProjectTotal.initiate()),
      store.dispatch(getTaskStatusUser.initiate()),
      store.dispatch(getTaskStatusAll.initiate()),
      store.dispatch(getUserActivities.initiate()),
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
      title: 'Dashboard',
    },
  };
});

export default Dashboard;
