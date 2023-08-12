// React
import { useEffect } from 'react';

// Next
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

// MUI Components
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

// Icons
import { IconLogo } from '@/common/icons';

import { IPropsChildren } from '@/common/types';

export interface LayoutAuthProps extends IPropsChildren {
  noRedirect?: boolean;
}

const LayoutAuth = ({ noRedirect, children }: LayoutAuthProps) => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!noRedirect && session.data?.user.userToken.accessToken) {
      router.replace('/app/dashboard').catch(() => {
        //
      });
    }
  }, [session, noRedirect, router]);

  return (
    <Grid
      component="main"
      sx={{ display: 'flex', minHeight: '100vh', py: 4 }}
      alignItems={{ xs: 'start', md: 'center' }}
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
