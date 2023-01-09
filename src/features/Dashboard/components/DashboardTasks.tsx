import { useCallback } from 'react';

// MUI Components
import { Box, Grid } from '@mui/material';

// MUI utils
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// Charts
import { Doughnut } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';

// Constant
import STATUS, { StatusType } from '@/common/constants/status';

// Local Component
import { TypographyTasks } from './styled';
import { BaseCard } from '@/common/base';
import { BaseCardProps } from '@/common/base/BaseCard';

import { useGetTaskStatusAllQuery, useGetTaskStatusUserQuery } from '../store/dashboard.api.slice';
import { ITaskStatusStatsResponse } from '../interfaces';

const baseCardStyle: BaseCardProps = { sx: { height: 250 } };
const labelGrey = ['#dddbdbd6'];

const DashboardTasks = () => {
  const { data: dataTotal, isFetching, isLoading } = useGetTaskStatusAllQuery();
  const { data: dataUser } = useGetTaskStatusUserQuery();

  const theme = useTheme();
  const mdAndDown = useMediaQuery(theme.breakpoints.down('md'));

  const optionsChart = useCallback(
    (data?: ITaskStatusStatsResponse): ChartOptions<'doughnut'> => {
      const isAllZero = Object.values<number>(data || {}).every((issue: number) => issue === 0.01);
      const labelColors = Object.keys(data || {}).map((key: string) => STATUS[key as StatusType].color);
      return {
        maintainAspectRatio: false,
        datasets: {
          doughnut: { backgroundColor: isAllZero ? labelGrey : labelColors, hoverOffset: 4 },
        },
        plugins: {
          legend: { position: mdAndDown ? 'bottom' : 'right' },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || '';
                const value = Number(context.parsed.toFixed(0));
                return `${label}: ${value}`;
              },
            },
          },
        },
      };
    },
    [mdAndDown],
  );

  return (
    <Grid container spacing={3} columns={12}>
      <Grid item xs={12} sm={6} md={5} lg={4}>
        <BaseCard {...baseCardStyle} loading={isLoading || isFetching}>
          <TypographyTasks>All Tasks</TypographyTasks>
          <Box sx={{ height: 180, width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Doughnut
              data={{
                labels: Object.keys(dataTotal?.data || {}).map((key) => STATUS[key as StatusType].name),
                datasets: [{ label: 'All Tasks', data: Object.values(dataTotal?.data || {}) }],
              }}
              options={optionsChart(dataTotal?.data)}
            />
          </Box>
        </BaseCard>
      </Grid>
      <Grid item xs={12} sm={6} md={5} lg={4}>
        <BaseCard {...baseCardStyle} loading={isLoading || isFetching}>
          <TypographyTasks>Tasks Assign to You</TypographyTasks>
          <Box sx={{ height: 180, width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Doughnut
              data={{
                labels: Object.keys(dataUser?.data || {}).map((key) => STATUS[key as StatusType].name),
                datasets: [{ label: 'Tasks', data: Object.values(dataUser?.data || {}) }],
              }}
              options={optionsChart(dataUser?.data)}
            />
          </Box>
        </BaseCard>
      </Grid>
    </Grid>
  );
};

export default DashboardTasks;
