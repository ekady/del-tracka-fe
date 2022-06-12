// Components
import { Box, Button, Typography } from '@mui/material';

// Next Components
import Link from 'next/link';

const LandingCTA = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: 220,
        backgroundColor: '#ebebeb',
        mb: 20,
        mt: 24,
      }}
    >
      <Typography component="h5" variant="h5" sx={{ textAlign: 'center' }}>
        SIGN IN &amp; START WORKING NOW
      </Typography>
      <Box sx={{ mt: 3 }}>
        <Link href="/sign-in" passHref>
          <Button color="secondary" variant="contained">
            Sign In
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default LandingCTA;
