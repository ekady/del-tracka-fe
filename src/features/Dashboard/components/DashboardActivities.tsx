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

import { useGetUserActivitiesQuery } from '../store/dashboard.api.slice';

const baseCardStyle: BaseCardProps = { sx: { height: 400 } };

const DashboardActivities = () => {
  const { data, isLoading, isFetching } = useGetUserActivitiesQuery();
  const theme = useTheme();

  const chartData = {
    labels: data?.data.map((val) => val.date),
    datasets: [
      {
        label: 'Activities',
        data: data?.data.map((val) => val.count),
        fill: false,
        borderColor: theme.palette.secondary.main,
        tension: 0.1,
      },
    ],
  };

  const optionsChart: ChartOptions<'line'> = {
    maintainAspectRatio: false,
    datasets: {
      line: {
        backgroundColor: theme.palette.primary.main,
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
            <Line data={chartData} options={optionsChart} />
          </Box>
        </BaseCard>
      </Grid>
    </Grid>
  );
};

export default DashboardActivities;
