// MUI Components
import { Box, Grid } from '@mui/material';

// MUI utils
import { useTheme } from '@mui/material/styles';

// Charts
import { Line } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';

import { TypographyActivities } from './styled';
import { BaseCard } from '@/common/base';
import { BaseCardProps } from '@/common/base/BaseCard';

import { useAppSelector } from '@/common/store/store';
import { selectActivities, selectActivitiesLabel } from '../store/dashboard.selector';
import { useGetDashboardDatasQuery } from '../store/dashboard.api.slice';

const baseCardStyle: BaseCardProps = { sx: { height: 400 } };

const DashboardActivities = () => {
  const { isLoading, isFetching } = useGetDashboardDatasQuery();
  const activities = useAppSelector(selectActivities);
  const activitiesLabel = useAppSelector(selectActivitiesLabel);

  const theme = useTheme();
  const { primary, secondary } = theme.palette;

  const data = {
    labels: activitiesLabel,
    datasets: [
      {
        label: 'Activities',
        data: activities,
        fill: false,
        borderColor: secondary.main,
        tension: 0.1,
      },
    ],
  };

  const optionsChart: ChartOptions<'line'> = {
    maintainAspectRatio: false,
    datasets: {
      line: {
        backgroundColor: primary.main,
      },
    },
    plugins: {
      legend: { position: 'bottom' },
    },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { display: false } },
    },
  };

  return (
    <Grid container spacing={3} columns={12}>
      <Grid item xs={12}>
        <BaseCard {...baseCardStyle} loading={isLoading || isFetching}>
          <TypographyActivities>Your Activities</TypographyActivities>
          <Box sx={{ height: 330, width: '97%' }}>
            <Line data={data} options={optionsChart} />
          </Box>
        </BaseCard>
      </Grid>
    </Grid>
  );
};

export default DashboardActivities;
