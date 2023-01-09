// React
import { ReactElement } from 'react';

// Components
import { Box } from '@mui/material';

import { LayoutDefault } from '@/common/layout';
import { DashboardActivities, DashboardTasks, DashboardTotal } from '@/features/dashboard/components';

const DashboardPage = () => (
  <>
    <DashboardTotal />
    <Box sx={{ height: 30 }} />
    <DashboardTasks />
    <Box sx={{ height: 30 }} />
    <DashboardActivities />
  </>
);

DashboardPage.getLayout = (page: ReactElement) => {
  return <LayoutDefault>{page}</LayoutDefault>;
};

export default DashboardPage;
