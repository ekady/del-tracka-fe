// Next Components
import Image from 'next/image';

// MUI Components
import { Box, Grid, Container } from '@mui/material';

// Icons
import { IconLogo } from '@/common/icons';

import { IPropsChildren } from '@/common/types';

const LayoutPlain = ({ children }: IPropsChildren) => {
  return (
    <Grid component="main" sx={{ height: '100%', width: '100%' }}>
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
