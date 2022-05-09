// MUI Components
import { Box, Grid } from '@mui/material';

// Helper
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

// Local Components
import { ProjectOverview, ProjectOverviewActivity, ProjectOverviewSprint, ProjectDetailTitle } from './components';
import { ProjectOverviewProps } from './components/ProjectOverview/ProjectOverview';

const dummyProjectOverview: ProjectOverviewProps[] = [
  { name: 'Open', value: 20, color: '#1C1632', textColor: '#fff' },
  { name: 'In Progress', value: 20, color: '#1C4D76', textColor: '#fff' },
  { name: 'Under Review', value: 20, color: '#1D84BB', textColor: '#fff' },
  { name: 'Close', value: 20, color: '#1DBBFF', textColor: '#fff' },
];

const ProjectDetail = () => {
  const theme = useTheme();
  const lgAndUp = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <>
      <Grid container gap={2} justifyContent={{ xs: 'start', sm: 'space-between' }}>
        <ProjectDetailTitle />
      </Grid>
      <Box sx={{ height: 40 }} />
      <Grid container gap={1} columns={13} justifyContent={{ xs: 'center', sm: 'space-between' }}>
        {dummyProjectOverview.map((po) => (
          <ProjectOverview key={po.name} {...po} />
        ))}
      </Grid>
      <Box sx={{ height: 50 }} />
      <Grid container gap={2} justifyContent={{ xs: 'center', md: 'space-between' }}>
        <Grid item xs={12} xl={7}>
          <ProjectOverviewSprint />
        </Grid>
        <Grid item xs={12} xl={4} sx={{ pt: lgAndUp ? 0 : 5 }}>
          <ProjectOverviewActivity />
        </Grid>
      </Grid>
    </>
  );
};

export default ProjectDetail;
