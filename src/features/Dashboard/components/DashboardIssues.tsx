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

// Store
import { useSelector } from 'react-redux';
import { RootState } from '@/common/redux/store';

// Local Component
import { PaperIssues, TypographyIssues } from './styled';

const LABELS: StatusType[] = ['OPEN', 'IN_PROGRESS', 'CLOSE'];
const labels = LABELS.map((label) => STATUS[label as StatusType].name);
const labelsColor = LABELS.map((label) => STATUS[label as StatusType].color);

const issueAllSelector = (state: RootState) => state.dashboard.data.allIssues;
const issueAssignSelector = (state: RootState) => state.dashboard.data.allAssignTo;

const DashboardIssues = () => {
  const issueAll = useSelector(issueAllSelector);
  const issueAssignTo = useSelector(issueAssignSelector);

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

  const optionsChart: ChartOptions<'doughnut'> = {
    maintainAspectRatio: false,
    datasets: {
      doughnut: { backgroundColor: labelsColor, hoverOffset: 4 },
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
            <Doughnut data={dataAll} options={optionsChart} />
          </Box>
        </PaperIssues>
      </Grid>
      <Grid item xs={12} sm={6} md={5} lg={4}>
        <PaperIssues>
          <TypographyIssues>Issues Assign to You</TypographyIssues>
          <Box sx={{ height: 180, width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Doughnut data={dataAssignTo} options={optionsChart} />
          </Box>
        </PaperIssues>
      </Grid>
    </Grid>
  );
};

export default DashboardIssues;
