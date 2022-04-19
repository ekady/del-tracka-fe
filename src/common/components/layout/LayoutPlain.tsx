// React
import * as React from 'react';

// Next Components
import Image from 'next/image';

// MUI Components
import { Box, Grid } from '@mui/material';

// Local Components
import { Copyright } from '../base';
import { Container } from '@mui/material';

// Utils
import { useTheme, ThemeProvider } from '@mui/material/styles';

// Icons
import { IconLogo } from '../../icons';

interface LayoutPlainProps {
  children: React.ReactNode;
}

export default function LayoutPlain({ children }: LayoutPlainProps) {
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
}
