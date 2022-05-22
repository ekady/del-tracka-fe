// React
import { ReactElement, useEffect } from 'react';

// Components
import { Box, CircularProgress } from '@mui/material';

import { LayoutDefault } from '@/common/layout';
import { DashboardActivities, DashboardIssues, DashboardTotal } from '@/features/Dashboard/components';

import { useAppDispatch } from '@/common/hooks';
import { resetApiState, useGetDashboardDatasQuery } from '@/features/Dashboard/store/dashboard.api.slice';

const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useGetDashboardDatasQuery();

  useEffect(() => {
    return () => {
      dispatch(resetApiState());
    };
  }, [dispatch]);

  return (
    <>
      {isLoading && <CircularProgress />}
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
