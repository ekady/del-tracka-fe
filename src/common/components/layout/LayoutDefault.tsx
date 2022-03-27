// React
import * as React from 'react';

// MUI Components
import { Grid, Container, Box, CssBaseline } from '@mui/material';

// Utils
import { useTheme, ThemeProvider } from '@mui/material/styles';

// Local Components
import { Copyright } from '../base';
import { Header } from '../base';
interface LayoutHomeProps {
  children: React.ReactNode;
}

export default function LayoutDefault({ children }: LayoutHomeProps) {
  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ minHeight: '100vh', flexGrow: 1, pt: 6 }}>
        <Box sx={{ display: 'flex', width: '100%' }}>
          <CssBaseline />
          <Header isSignIn showMenu={true} usingSidebar />
          <Container maxWidth="xl" sx={{ flexGrow: 1, pt: 5, px: 3, height: '100%', overflowX: 'hidden' }}>
            {children}
          </Container>
        </Box>
      </Grid>
      <Copyright sx={{ mb: 1 }} />
    </ThemeProvider>
  );
}
