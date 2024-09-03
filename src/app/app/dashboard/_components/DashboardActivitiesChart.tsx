'use client';

import { useMemo } from 'react';

// MUI utils
import { useTheme } from '@mui/material/styles';
import { ChartOptions } from 'chart.js';
import { Line } from 'react-chartjs-2';

import { IUserActivitiesStats } from '@/app/app/dashboard/_interfaces';

interface IDashboardActivitiesChartProps {
  activityStats: IUserActivitiesStats[];
}

const DashboardActivitiesChart = ({ activityStats }: IDashboardActivitiesChartProps) => {
  const theme = useTheme();

  const chartData = {
    labels: activityStats.map((val) => val.date),
    datasets: [
      {
        label: 'Activities',
        data: activityStats.map((val) => val.count),
        fill: false,
        borderColor: theme.palette.secondary.main,
        tension: 0.1,
      },
    ],
  };

  const optionsChart: ChartOptions<'line'> = useMemo(
    () => ({
      maintainAspectRatio: false,
      datasets: {
        line: {
          backgroundColor: theme.palette.primary.main,
        },
      },
      plugins: {
        legend: { position: 'bottom', labels: { color: theme.palette.text.primary } },
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: theme.palette.text.primary } },
        y: { grid: { display: false }, ticks: { color: theme.palette.text.primary } },
      },
    }),
    [theme.palette.primary.main, theme.palette.text.primary],
  );

  return <Line redraw data={chartData} options={optionsChart} />;
};

export default DashboardActivitiesChart;
