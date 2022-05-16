// Next Components
import Image from 'next/image';

// MUI Components
import { Paper, Box, Grid } from '@mui/material';

// Utils
import { useTheme, ThemeProvider } from '@mui/material/styles';

// Local Components
import { Container } from '@mui/material';

// Icons
import { IconLogo } from '@/common/icons';

import { PropsChildren } from '@/types';

const LayoutAuth = ({ children }: PropsChildren) => {
  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
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
          sx={{ py: 5, height: '100%', display: 'flex' }}
        >
          <Box sx={{ my: 3, mx: { xs: 4, lg: 8 }, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{ mb: 1 }}>
              <Image src={IconLogo} alt="logo" width={70} />
            </Box>
            <Container maxWidth={false}>{children}</Container>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default LayoutAuth;
