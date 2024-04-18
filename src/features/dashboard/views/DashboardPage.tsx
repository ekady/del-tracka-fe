// Components
import Box from '@mui/material/Box';

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

export default DashboardPage;
