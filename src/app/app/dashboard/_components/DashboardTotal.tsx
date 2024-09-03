// MUI Components
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// Local Components
import BaseCard, { IBaseCardProps } from '@/app/_common/base/BaseCard';
import { actionFetchDashboardProjectTotal } from '@/app/app/dashboard/_actions/dashboard.action.utils';
import { TypographyTotalProject, TypographyTotalTask } from '@/app/app/dashboard/_components/styled';

const baseCardStyle: IBaseCardProps = { sx: { alignItems: 'center' } };

const DashboardTotal = async () => {
  const dataTotal = await actionFetchDashboardProjectTotal();

  return (
    <Grid container spacing={3} columns={12}>
      <Grid item xs={12} sm={3}>
        <BaseCard {...baseCardStyle}>
          <TypographyTotalProject component="h4" variant="h4">
            {dataTotal?.totalProject}
          </TypographyTotalProject>
          <Typography sx={{ fontWeight: 'bold', fontSize: 14, letterSpacing: 0.5 }}>Total Projects</Typography>
        </BaseCard>
      </Grid>
      <Grid item xs={12} sm={3}>
        <BaseCard {...baseCardStyle}>
          <TypographyTotalTask component="h4" variant="h4">
            {dataTotal?.totalTask}
          </TypographyTotalTask>
          <Typography sx={{ fontWeight: 'bold', fontSize: 14, letterSpacing: 0.5 }}>Total Tasks</Typography>
        </BaseCard>
      </Grid>
    </Grid>
  );
};

export default DashboardTotal;
