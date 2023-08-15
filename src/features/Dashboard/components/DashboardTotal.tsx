// MUI Components
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// MUI utils
import { useTheme } from '@mui/material/styles';

// Local Components
import { BaseCard } from '@/common/base';
import { BaseCardProps } from '@/common/base/BaseCard';

import { useGetTaskProjectTotalQuery } from '../store/dashboard.api.slice';

const baseCardStyle: BaseCardProps = { sx: { alignItems: 'center' } };

const DashboardTotal = () => {
  const { data, isFetching, isLoading } = useGetTaskProjectTotalQuery();
  const theme = useTheme();

  return (
    <Grid container spacing={3} columns={10}>
      <Grid item xs={12} sm={3} lg={2}>
        <BaseCard {...baseCardStyle} loading={isLoading || isFetching}>
          <Typography component="h4" variant="h4" sx={{ color: theme.palette.error.main, fontWeight: 'bold' }}>
            {data?.data.totalProject}
          </Typography>
          <Typography sx={{ fontWeight: 'bold', fontSize: 14, letterSpacing: 0.5 }}>Total Projects</Typography>
        </BaseCard>
      </Grid>
      <Grid item xs={12} sm={3} lg={2}>
        <BaseCard {...baseCardStyle} loading={isLoading || isFetching}>
          <Typography component="h4" variant="h4" sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
            {data?.data.totalTask}
          </Typography>
          <Typography sx={{ fontWeight: 'bold', fontSize: 14, letterSpacing: 0.5 }}>Total Tasks</Typography>
        </BaseCard>
      </Grid>
    </Grid>
  );
};

export default DashboardTotal;
