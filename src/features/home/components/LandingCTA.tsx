// Components
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { useTheme } from '@mui/material/styles';

// Next Components
import Link from 'next/link';

const LandingCTA = () => {
  const theme = useTheme();
  return (
    <Paper
      elevation={0}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: 220,
        backgroundColor: theme.palette.primary.dark,
        mb: 20,
        mt: 24,
      }}
    >
      <Typography
        component="h5"
        variant="h5"
        sx={{ textAlign: 'center', color: theme.palette.getContrastText(theme.palette.primary.dark) }}
      >
        SIGN IN &amp; START WORKING NOW
      </Typography>
      <Box sx={{ mt: 3 }}>
        <Link href="/auth/sign-in" passHref>
          <Button color="secondary" variant="contained">
            Sign In
          </Button>
        </Link>
      </Box>
    </Paper>
  );
};

export default LandingCTA;
