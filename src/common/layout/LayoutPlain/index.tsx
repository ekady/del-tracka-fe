// Next Components
import Image from 'next/image';

// MUI Components
import { Box, Grid } from '@mui/material';

// Local Components
import { Container } from '@mui/material';

// Utils
import { useTheme, ThemeProvider } from '@mui/material/styles';

// Icons
import { IconLogo } from '@/common/icons';

import { PropsChildren } from '@/types';

const LayoutPlain = ({ children }: PropsChildren) => {
  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <Grid component="main" sx={{ height: '100%', width: '100%' }}>
        <Box
          sx={{
            my: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100%',
            width: '100%',
          }}
        >
          <Box sx={{ mb: 1 }}>
            <Image src={IconLogo} alt="logo" width={70} />
          </Box>

          <Container
            sx={{
              align: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            maxWidth={false}
          >
            {children}
          </Container>
        </Box>
      </Grid>
    </ThemeProvider>
  );
};

export default LayoutPlain;
