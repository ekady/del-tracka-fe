// MUI Components
import { Grid, Paper as MUIPaper, Typography } from '@mui/material';

// MUI utils
import { styled, useTheme } from '@mui/material/styles';

const Paper = styled(MUIPaper)(() => ({
  width: '100%',
  padding: 15,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  boxShadow: 'none',
  border: '1px solid #ddd',
  borderRadius: '20px',
}));

export default function DashboardTotal() {
  const theme = useTheme();

  return (
    <Grid container spacing={3} columns={10}>
      <Grid item xs={12} sm={3} lg={2}>
        <Paper>
          <Typography component="h4" variant="h4" sx={{ color: theme.palette.error.main, fontWeight: 'bold' }}>
            20
          </Typography>
          <Typography sx={{ fontWeight: 'bold', fontSize: 14, letterSpacing: 0.5, color: '#4F4F4F' }}>Total Projects</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={3} lg={2}>
        <Paper>
          <Typography component="h4" variant="h4" sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
            100
          </Typography>
          <Typography sx={{ fontWeight: 'bold', fontSize: 14, letterSpacing: 0.5, color: '#4F4F4F' }}>Total Issues</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}
