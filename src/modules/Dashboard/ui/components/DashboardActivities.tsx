// MUI Components
import { Box, Grid, Paper as MUIPaper, Typography as MUITypography } from '@mui/material';

// MUI utils
import { styled, useTheme } from '@mui/material/styles';

// Charts
import { Line } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';

const Paper = styled(MUIPaper)(() => ({
  width: '100%',
  height: 400,
  padding: 15,
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

export default function DashboardActivities() {
  const theme = useTheme();
  const { primary, secondary } = theme.palette;

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Activities',
        data: [65, 59, 80, 81, 56, 55, 40],
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
        <Paper>
          <Typography>Your Activities</Typography>
          <Box sx={{ height: 330, width: '97%' }}>
            <Line data={data} options={optionsChart} />
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}
