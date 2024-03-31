// Next Components
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Icons
import { IconLogo } from '@/common/icons';

import { IPropsChildren } from '@/common/types';

const Box = dynamic(() => import('@mui/material/Box'), { ssr: false });
const Grid = dynamic(() => import('@mui/material/Grid'), { ssr: false });
const Container = dynamic(() => import('@mui/material/Container'), { ssr: false });

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
