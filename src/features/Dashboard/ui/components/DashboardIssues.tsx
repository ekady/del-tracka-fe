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

import { PaperIssues, TypographyIssues } from './styled';

const DashboardIssues = () => {
  const theme = useTheme();
  const mdAndDown = useMediaQuery(theme.breakpoints.down('md'));

  const labels = ['OPEN', 'IN_PROGRESS', 'CLOSE'];
  const data = {
    labels: labels.map((label) => STATUS[label as StatusType].name),
    datasets: [
      {
        label: 'My First Dataset',
        data: [300, 50, 100],
      },
    ],
  };

  const optionsChart: ChartOptions<'doughnut'> = {
    maintainAspectRatio: false,
    datasets: {
      doughnut: {
        backgroundColor: labels.map((label) => STATUS[label as StatusType].color),
        hoverOffset: 4,
      },
    },
    plugins: {
      legend: { position: mdAndDown ? 'bottom' : 'right' },
    },
  };

  return (
    <Grid container spacing={3} columns={12}>
      <Grid item xs={12} sm={6} md={5} lg={4}>
        <PaperIssues>
          <TypographyIssues>All Issues</TypographyIssues>
          <Box sx={{ height: 180, width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Doughnut data={data} options={optionsChart} />
          </Box>
        </PaperIssues>
      </Grid>
      <Grid item xs={12} sm={6} md={5} lg={4}>
        <PaperIssues>
          <TypographyIssues>Issues Assign to You</TypographyIssues>
          <Box sx={{ height: 180, width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Doughnut data={data} options={optionsChart} />
          </Box>
        </PaperIssues>
      </Grid>
    </Grid>
  );
};

export default DashboardIssues;
