// MUI Components
import { DashboardTotal, DashboardIssues, DashboardActivities } from './components';

// Local Components
import { Box } from '@mui/material';

export default function DashboardUI() {
  return (
    <>
      <DashboardTotal />
      <Box sx={{ py: 2 }} />
      <DashboardIssues />
      <Box sx={{ py: 2 }} />
      <DashboardActivities />
    </>
  );
}
