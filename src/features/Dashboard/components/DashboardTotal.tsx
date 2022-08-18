// MUI Components
import { Grid, Typography } from '@mui/material';

// MUI utils
import { useTheme } from '@mui/material/styles';

// Local Components
import { BaseCard } from '@/common/base';
import { BaseCardProps } from '@/common/base/BaseCard';

import { useAppSelector } from '@/common/store/store';
import { selectTotalIssues, selectTotalProjects } from '../store/dashboard.selector';
import { useGetDashboardDatasQuery } from '../store/dashboard.api.slice';

const baseCardStyle: BaseCardProps = { sx: { alignItems: 'center' } };

const DashboardTotal = () => {
  const { isFetching, isLoading } = useGetDashboardDatasQuery();
  const totalIssues = useAppSelector(selectTotalIssues);
  const totalProjects = useAppSelector(selectTotalProjects);

  const theme = useTheme();

  return (
    <Grid container spacing={3} columns={10}>
      <Grid item xs={12} sm={3} lg={2}>
        <BaseCard {...baseCardStyle} loading={isLoading || isFetching}>
          <Typography component="h4" variant="h4" sx={{ color: theme.palette.error.main, fontWeight: 'bold' }}>
            {totalProjects}
          </Typography>
          <Typography sx={{ fontWeight: 'bold', fontSize: 14, letterSpacing: 0.5, color: '#4F4F4F' }}>
            Total Projects
          </Typography>
        </BaseCard>
      </Grid>
      <Grid item xs={12} sm={3} lg={2}>
        <BaseCard {...baseCardStyle} loading={isLoading || isFetching}>
          <Typography component="h4" variant="h4" sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
            {totalIssues}
          </Typography>
          <Typography sx={{ fontWeight: 'bold', fontSize: 14, letterSpacing: 0.5, color: '#4F4F4F' }}>
            Total Issues
          </Typography>
        </BaseCard>
      </Grid>
    </Grid>
  );
};

export default DashboardTotal;
