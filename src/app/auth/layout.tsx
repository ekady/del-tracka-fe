// Next
import { Metadata } from 'next';

import Image from 'next/image';

import { Box, Container, Grid, Paper } from '@mui/material';

// MUI Components

// Icons
import { IconLogo } from '@/app/_common/icons';
import { IPropsChildren } from '@/app/_common/types';

export const metadata: Metadata = {
  robots: 'noindex,nofollow',
};

const LayoutAuth = ({ children }: IPropsChildren) => {
  return (
    <Grid
      component="main"
      sx={{ display: 'flex', minHeight: '100vh', py: 4 }}
      alignItems={{ xs: 'center', md: 'center' }}
      justifyContent="center"
    >
      <Grid
        item
        xs={11}
        sm={6}
        md={5}
        xl={4}
        maxWidth={500}
        component={Paper}
        elevation={6}
        alignItems="center"
        justifyContent="center"
        square
        sx={{ py: 5, height: '100%', display: 'flex', width: { xs: '90%', sm: '500px' } }}
      >
        <Box
          width="100%"
          sx={{ my: 3, mx: { xs: 4, lg: 8 }, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <Box mb={1}>
            <Image src={IconLogo} alt="logo" width={70} priority />
          </Box>
          <Container maxWidth={false}>{children}</Container>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LayoutAuth;
