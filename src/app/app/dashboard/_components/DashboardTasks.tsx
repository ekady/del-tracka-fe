import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import BaseCard, { IBaseCardProps } from '@/app/_common/base/BaseCard';
import {
  actionFetchDashboardTaskAll,
  actionFetchDashboardTaskUser,
} from '@/app/app/dashboard/_actions/dashboard.action.utils';
import DashboardTasksChart from '@/app/app/dashboard/_components/DashboardTasksChart';

import { TypographyTasks } from './styled';

const baseCardStyle: IBaseCardProps = { sx: { height: 250 } };

const DashboardTasks = async () => {
  const allTasks = await actionFetchDashboardTaskAll();
  const userTasks = await actionFetchDashboardTaskUser();

  return (
    <Grid container spacing={3} columns={12}>
      <Grid size={{ xs: 12, sm: 6 }}>
        <BaseCard {...baseCardStyle}>
          <TypographyTasks>All Tasks</TypographyTasks>
          <Box sx={{ height: 180, width: '100%', display: 'flex', justifyContent: 'center' }}>
            <DashboardTasksChart label="All Tasks" stats={allTasks} />
          </Box>
        </BaseCard>
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <BaseCard {...baseCardStyle}>
          <TypographyTasks>Tasks Assign to You</TypographyTasks>
          <Box sx={{ height: 180, width: '100%', display: 'flex', justifyContent: 'center' }}>
            <DashboardTasksChart label="My Tasks" stats={userTasks} />
          </Box>
        </BaseCard>
      </Grid>
    </Grid>
  );
};

export default DashboardTasks;
