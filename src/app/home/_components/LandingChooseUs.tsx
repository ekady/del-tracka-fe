// Components
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const LandingImages = () => {
  return (
    <Box sx={{ width: '100%', height: '100%', overflowY: 'visible' }}>
      <Typography component="h1" textAlign="center" fontSize={36} fontWeight="bold" textTransform="uppercase">
        Why Choose Tracka?
      </Typography>

      <Box height={80} />

      <Grid container spacing={6}>
        <Grid item xs={12} sm={4}>
          <Typography textAlign="center" fontSize={20} fontWeight="bold" textTransform="uppercase" mb={2}>
            Enhanced Collaboration
          </Typography>
          <Typography textAlign="center" fontSize={16}>
            Foster effective teamwork through streamlined communication, centralized task management, and real-time
            updates on project progress.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography textAlign="center" fontSize={20} fontWeight="bold" textTransform="uppercase" mb={2}>
            Improved Productivity
          </Typography>
          <Typography textAlign="center" fontSize={16}>
            With well-organized projects, sprints, and tasks, your team can work efficiently and stay focused on
            delivering high-quality results.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography textAlign="center" fontSize={20} fontWeight="bold" textTransform="uppercase" mb={2}>
            Transparency
          </Typography>
          <Typography textAlign="center" fontSize={16}>
            Transparent project tracking and member activity reports ensure everyone knows what&apos;s happening and
            where their efforts are making an impact.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LandingImages;
