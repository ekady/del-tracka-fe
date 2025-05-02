import Image from 'next/image';

import { Box, Container, Grid } from '@mui/material';

import { IconLogo } from '@/app/_common/icons';
import { IPropsChildren } from '@/app/_common/types';

const LayoutPlain = ({ children }: IPropsChildren) => {
  return (
    <Grid sx={{ height: '100%', width: '100%' }}>
      <Box
        sx={{ my: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', width: '100%' }}
      >
        <Box sx={{ mb: 1 }}>
          <Image src={IconLogo} alt="logo" width={70} priority />
        </Box>

        <Container
          sx={{ align: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          maxWidth={false}
        >
          {children}
        </Container>
      </Box>
    </Grid>
  );
};

export default LayoutPlain;
