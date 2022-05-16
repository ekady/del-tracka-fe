// MUI Components
import { Box, Grid } from '@mui/material';

// MUI utils
import { useTheme } from '@mui/material/styles';

// Charts
import { Line } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';

import { PaperActivities, TypographyActivities } from './styled';

const DashboardActivities = () => {
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
        <PaperActivities>
          <TypographyActivities>Your Activities</TypographyActivities>
          <Box sx={{ height: 330, width: '97%' }}>
            <Line data={data} options={optionsChart} />
          </Box>
        </PaperActivities>
      </Grid>
    </Grid>
  );
};

export default DashboardActivities;
