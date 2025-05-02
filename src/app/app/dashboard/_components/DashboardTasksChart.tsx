'use client';

import { useCallback } from 'react';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ChartOptions } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import STATUS, { TStatusType } from '@/app/_common/constants/status.constant';

import { ITaskStatusStatsResponse } from '../_interfaces';

const labelGrey = ['#dddbdbd6'];

interface IDashboardTasksChartProps {
  label: string;
  stats: ITaskStatusStatsResponse;
}

const DashboardTasksChart = ({ label, stats }: IDashboardTasksChartProps) => {
  const theme = useTheme();
  const mdAndDown = useMediaQuery(theme.breakpoints.down('md'));

  const optionsChart = useCallback(
    (data?: ITaskStatusStatsResponse): ChartOptions<'doughnut'> => {
      const isAllZero = Object.values<number>(data ?? {}).every((issue: number) => issue <= 0.01);
      const labelColors = Object.keys(data ?? {}).map((key: string) => STATUS[key as TStatusType].color);
      return {
        maintainAspectRatio: false,
        datasets: {
          doughnut: { backgroundColor: isAllZero ? labelGrey : labelColors, hoverOffset: 4 },
        },
        plugins: {
          legend: { position: mdAndDown ? 'bottom' : 'right', labels: { color: theme.palette.text.primary } },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label ?? '';
                const value = Number(context.parsed.toFixed(0));
                return `${label}: ${value}`;
              },
            },
          },
        },
      };
    },
    [mdAndDown, theme.palette.text.primary],
  );

  return (
    <Doughnut
      data={{
        labels: Object.keys(stats ?? {}).map((key) => STATUS[key as TStatusType].name),
        datasets: [
          {
            label,
            data: Object.values(stats ?? {}),
            backgroundColor: optionsChart(stats).datasets?.doughnut?.backgroundColor ?? [],
          },
        ],
      }}
      options={optionsChart(stats)}
    />
  );
};

export default DashboardTasksChart;
