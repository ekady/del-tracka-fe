// MUI Components
import { Box, Grid } from '@mui/material';

// Helper
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

// Local Components
import { ProjectOverview, ProjectOverviewActivity, ProjectOverviewSprint } from './components';
import { ProjectOverviewProps } from './components/ProjectOverview/ProjectOverview';

const dummyProjectOverview: ProjectOverviewProps[] = [
  { category: 'Open', categoryValue: 20, color: '#1C1632', textColor: '#fff' },
  { category: 'In Progress', categoryValue: 20, color: '#1C4D76', textColor: '#fff' },
  { category: 'Under Review', categoryValue: 20, color: '#1D84BB', textColor: '#fff' },
  { category: 'Close', categoryValue: 20, color: '#1DBBFF', textColor: '#fff' },
];

export default function ProjectDetail() {
  const theme = useTheme();
  const lgAndUp = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <>
      <Grid container gap={2} columns={13} justifyContent={{ xs: 'center', sm: 'space-between' }}>
        {dummyProjectOverview.map((po) => (
          <ProjectOverview key={po.category} {...po} />
        ))}
      </Grid>
      <Box sx={{ height: 80 }} />
      <Grid container gap={2} columns={13} justifyContent={{ xs: 'center', md: 'space-between' }}>
        <Grid item xs={12} lg={9}>
          <ProjectOverviewSprint />
        </Grid>
        <Grid item xs={12} lg="auto" sx={{ pt: lgAndUp ? 0 : 5 }}>
          <ProjectOverviewActivity />
        </Grid>
      </Grid>
    </>
  );
}
