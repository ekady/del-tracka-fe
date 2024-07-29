'use client';

import Link from 'next/link';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

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
        sx={{
          textAlign: 'center',
          color: theme.palette.getContrastText(theme.palette.primary.dark),
          textTransform: 'uppercase',
          fontWeight: 'bold',
        }}
      >
        Elevate Your Project Management <br /> Join Tracka Today!
      </Typography>
      <Box sx={{ mt: 3 }}>
        <Link href="/auth/sign-up" passHref>
          <Button color="secondary" variant="contained">
            Get Started Now!
          </Button>
        </Link>
      </Box>
    </Paper>
  );
};

export default LandingCTA;
