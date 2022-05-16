// MUI Components
import { DashboardTotal, DashboardIssues, DashboardActivities } from './components';

// Local Components
import { Box } from '@mui/material';

const DashboardUI = () => {
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

export default DashboardUI;
