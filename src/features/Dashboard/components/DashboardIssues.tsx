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
import { TypographyIssues } from './styled';
import { BaseCard } from '@/common/base';
import { BaseCardProps } from '@/common/base/BaseCard';

import { useAppSelector } from '@/common/store';
import { selectissueAll, selectIssueAssignTo } from '../store/dashboard.selector';
import { useGetDashboardDatasQuery } from '../store/dashboard.api.slice';

const baseCardStyle: BaseCardProps = { sx: { height: 250 } };

const LABELS: StatusType[] = ['OPEN', 'IN_PROGRESS', 'CLOSE'];
const labels = LABELS.map((label) => STATUS[label as StatusType].name);
const labelsColor = LABELS.map((label) => STATUS[label as StatusType].color);
const labelGrey = ['#dddbdbd6'];

const DashboardIssues = () => {
  const issueAll = useAppSelector(selectissueAll);
  const issueAssignTo = useAppSelector(selectIssueAssignTo);
  const { isFetching, isLoading } = useGetDashboardDatasQuery();

  const isIssueAllZero = issueAll.every((issue: number) => issue === 0.01);
  const isIssueAssignToZero = issueAssignTo.every((issue: number) => issue === 0.01);

  const theme = useTheme();
  const mdAndDown = useMediaQuery(theme.breakpoints.down('md'));

  const dataAll = {
    labels,
    datasets: [{ label: 'All Issues', data: issueAll }],
  };

  const dataAssignTo = {
    labels,
    datasets: [{ label: 'Issues Assign To You', data: issueAssignTo }],
  };

  const optionsChart = (isAllZero: boolean): ChartOptions<'doughnut'> => ({
    maintainAspectRatio: false,
    datasets: {
      doughnut: { backgroundColor: isAllZero ? labelGrey : labelsColor, hoverOffset: 4 },
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
  });

  return (
    <Grid container spacing={3} columns={12}>
      <Grid item xs={12} sm={6} md={5} lg={4}>
        <BaseCard {...baseCardStyle} loading={isLoading || isFetching}>
          <TypographyIssues>All Issues</TypographyIssues>
          <Box sx={{ height: 180, width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Doughnut data={dataAll} options={optionsChart(isIssueAllZero)} />
          </Box>
        </BaseCard>
      </Grid>
      <Grid item xs={12} sm={6} md={5} lg={4}>
        <BaseCard {...baseCardStyle} loading={isLoading || isFetching}>
          <TypographyIssues>Issues Assign to You</TypographyIssues>
          <Box sx={{ height: 180, width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Doughnut data={dataAssignTo} options={optionsChart(isIssueAssignToZero)} />
          </Box>
        </BaseCard>
      </Grid>
    </Grid>
  );
};

export default DashboardIssues;