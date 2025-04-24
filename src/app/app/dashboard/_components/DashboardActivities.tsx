// MUI Components
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import BaseCard from '@/app/_common/base/BaseCard';
import { actionFetchDashboardActivities } from '@/app/app/dashboard/_actions/dashboard.action.utils';
import DashboardActivitiesChart from '@/app/app/dashboard/_components/DashboardActivitiesChart';
import { TypographyActivities } from '@/app/app/dashboard/_components/styled';

const DashboardActivities = async () => {
  const activityStats = await actionFetchDashboardActivities();
  return (
    <Grid container spacing={3} columns={12}>
      <Grid size={{ xs: 12 }}>
        <BaseCard sx={{ height: 400 }}>
          <TypographyActivities>Your Activities</TypographyActivities>
          <Box sx={{ height: 330, width: '97%' }}>
            <DashboardActivitiesChart activityStats={activityStats} />
          </Box>
        </BaseCard>
      </Grid>
    </Grid>
  );
};

export default DashboardActivities;
