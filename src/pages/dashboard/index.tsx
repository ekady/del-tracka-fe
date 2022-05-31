// React
import { ReactElement, useEffect } from 'react';

// Components
import { Box } from '@mui/material';

import { LayoutDefault } from '@/common/layout';
import { DashboardActivities, DashboardIssues, DashboardTotal } from '@/features/Dashboard/components';

import { useAppDispatch } from '@/common/store/store';
import { resetApiState, useLazyGetDashboardDatasQuery } from '@/features/Dashboard/store/dashboard.api.slice';

const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const [getData] = useLazyGetDashboardDatasQuery();

  useEffect(() => {
    getData();
    return () => {
      dispatch(resetApiState());
    };
  }, [dispatch, getData]);

  return (
    <>
      <DashboardTotal />
      <Box sx={{ height: 30 }} />
      <DashboardIssues />
      <Box sx={{ height: 30 }} />
      <DashboardActivities />
    </>
  );
};

DashboardPage.getLayout = (page: ReactElement) => {
  return <LayoutDefault>{page}</LayoutDefault>;
};

export default DashboardPage;
