import Image from 'next/image';
import Link from 'next/link';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import LandingBannerPict from '@/app/_common/icons/images/landing-1.png';

const LandingBanner = () => {
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 12 }}
      sx={{ alignItems: 'center', my: 2, justifyContent: 'center', height: { xs: 'auto', sm: 500 } }}
    >
      <Grid size={{ xs: 12, sm: 6 }} sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
        <Box>
          <Typography component="p" gutterBottom sx={{ fontSize: { lg: 44, md: 36, xs: 28 }, mt: { xs: 4, sm: 0 } }}>
            Welcome to Tracka: Your Ultimate Bug Tracker App
          </Typography>
          <Typography component="p" variant="subtitle2" fontSize={18} gutterBottom>
            Introducing the comprehensive bug tracker app designed to streamline your project management process and
            keep your team on track.
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Link href="/auth/sign-up" passHref>
              <Button color="secondary" variant="contained">
                Get Started
              </Button>
            </Link>
          </Box>
        </Box>
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <Image
          src={LandingBannerPict}
          alt="icon-scrum-board"
          width={900}
          height={600}
          priority
          style={{ objectFit: 'contain', width: '100%', height: 'auto' }}
        />
      </Grid>
    </Grid>
  );
};

export default LandingBanner;
