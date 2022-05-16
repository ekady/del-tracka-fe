// MUI Components
import { Grid, Typography } from '@mui/material';

// MUI utils
import { useTheme } from '@mui/material/styles';

// Store
import { RootState } from '@/common/redux/store';

// Local Components
import { PaperTotal } from './styled';
import { useSelector } from 'react-redux';

const totalProjectsSelector = (state: RootState) => state.dashboard.data.totalProjects;
const totalIssuesSelector = (state: RootState) => state.dashboard.data.totalIssues;

const DashboardTotal = () => {
  const totalProjects = useSelector(totalProjectsSelector);
  const totalIssues = useSelector(totalIssuesSelector);

  const theme = useTheme();

  return (
    <Grid container spacing={3} columns={10}>
      <Grid item xs={12} sm={3} lg={2}>
        <PaperTotal>
          <Typography component="h4" variant="h4" sx={{ color: theme.palette.error.main, fontWeight: 'bold' }}>
            {totalProjects}
          </Typography>
          <Typography sx={{ fontWeight: 'bold', fontSize: 14, letterSpacing: 0.5, color: '#4F4F4F' }}>Total Projects</Typography>
        </PaperTotal>
      </Grid>
      <Grid item xs={12} sm={3} lg={2}>
        <PaperTotal>
          <Typography component="h4" variant="h4" sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
            {totalIssues}
          </Typography>
          <Typography sx={{ fontWeight: 'bold', fontSize: 14, letterSpacing: 0.5, color: '#4F4F4F' }}>Total Issues</Typography>
        </PaperTotal>
      </Grid>
    </Grid>
  );
};

export default DashboardTotal;
