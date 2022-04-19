// MUI Components
import { DashboardTotal, DashboardIssues, DashboardActivities } from './components';

// Local Components
import { Box } from '@mui/material';

export default function DashboardUI() {
  return (
    <>
      <DashboardTotal />
      <Box sx={{ height: 30 }} />
      <DashboardIssues />
      <Box sx={{ height: 30 }} />
      <DashboardActivities />
    </>
  );
}
