// MUI Components
import { Grid, Typography } from '@mui/material';

// MUI utils
import { useTheme } from '@mui/material/styles';

import { PaperTotal } from './styled';

const DashboardTotal = () => {
  const theme = useTheme();

  return (
    <Grid container spacing={3} columns={10}>
      <Grid item xs={12} sm={3} lg={2}>
        <PaperTotal>
          <Typography component="h4" variant="h4" sx={{ color: theme.palette.error.main, fontWeight: 'bold' }}>
            20
          </Typography>
          <Typography sx={{ fontWeight: 'bold', fontSize: 14, letterSpacing: 0.5, color: '#4F4F4F' }}>Total Projects</Typography>
        </PaperTotal>
      </Grid>
      <Grid item xs={12} sm={3} lg={2}>
        <PaperTotal>
          <Typography component="h4" variant="h4" sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
            100
          </Typography>
          <Typography sx={{ fontWeight: 'bold', fontSize: 14, letterSpacing: 0.5, color: '#4F4F4F' }}>Total Issues</Typography>
        </PaperTotal>
      </Grid>
    </Grid>
  );
};

export default DashboardTotal;
