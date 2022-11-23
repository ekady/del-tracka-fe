// React
import { ReactElement, useEffect } from 'react';

// Components
import { Box } from '@mui/material';

import { LayoutDefault } from '@/common/layout';
import { DashboardActivities, DashboardTasks, DashboardTotal } from '@/features/dashboard/components';

import { useLazyGetDashboardDatasQuery } from '@/features/dashboard/store/dashboard.api.slice';

const DashboardPage = () => {
  const [getData] = useLazyGetDashboardDatasQuery();

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
      <DashboardTotal />
      <Box sx={{ height: 30 }} />
      <DashboardTasks />
      <Box sx={{ height: 30 }} />
      <DashboardActivities />
    </>
  );
};

DashboardPage.getLayout = (page: ReactElement) => {
  return <LayoutDefault>{page}</LayoutDefault>;
};

export default DashboardPage;
