// MUI Components
import { Box, Grid, Paper as MUIPaper, Typography as MUITypography } from '@mui/material';

// MUI utils
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// Charts
import { Doughnut } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';

// Constant
import status from '@/common/constants/status';

const Paper = styled(MUIPaper)(() => ({
  width: '100%',
  height: 250,
  paddingLeft: 15,
  paddingRight: 15,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  boxShadow: 'none',
  border: '1px solid #ddd',
  borderRadius: '20px',
}));

const Typography = styled(MUITypography)(() => ({
  fontWeight: 'bold',
  fontSize: 14,
  letterSpacing: 0.5,
  color: '#4F4F4F',
  marginBottom: 10,
}));

export default function DashboardIssues() {
  const theme = useTheme();
  const mdAndDown = useMediaQuery(theme.breakpoints.down('md'));

  const labels = ['OPEN', 'IN_PROGRESS', 'CLOSE'];
  const data = {
    labels: labels.map((label) => status[label].name),
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
        backgroundColor: labels.map((label) => status[label].color),
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
        <Paper>
          <Typography>All Issues</Typography>
          <Box sx={{ height: 180, width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Doughnut data={data} options={optionsChart} />
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={5} lg={4}>
        <Paper>
          <Typography>Issues Assign to You</Typography>
          <Box sx={{ height: 180, width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Doughnut data={data} options={optionsChart} />
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}
