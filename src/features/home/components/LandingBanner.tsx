// MUI Components
import { Box, Button, Grid, Typography } from '@mui/material';

// Next Components
import Image from 'next/image';
import Link from 'next/link';

// Icons
import { IconScrumBoard } from '@/common/icons';

const LandingBanner = () => {
  return (
    <Grid container spacing={2} sx={{ alignItems: 'center', my: 2, justifyContent: 'center' }}>
      <Grid item xs={12} sm={6} sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
        <Box>
          <Typography component="p" gutterBottom sx={{ fontSize: { lg: 44, md: 36, xs: 28 }, mt: { xs: 4, sm: 0 } }}>
            Invite your team and start working together.
          </Typography>
          <Typography component="p" variant="subtitle2" fontSize={18} gutterBottom>
            Manage and monitor your application issue together with your team member.
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Link href="/auth/sign-in" passHref>
              <Button color="secondary" variant="contained">
                Sign In
              </Button>
            </Link>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Image
          src={IconScrumBoard}
          alt="icon-scrum-board"
          width={400}
          height={400}
          priority
          style={{ objectFit: 'contain', width: '100%', height: 'auto' }}
        />
      </Grid>
    </Grid>
  );
};

export default LandingBanner;
