// MUI Components
import { Grid } from '@mui/material';

// Utils
import { useTheme, ThemeProvider } from '@mui/material/styles';

// Local Components
import { Copyright, Header } from '@/common/base';

import { PropsChildren } from '@/common/types';

const LayoutHome = ({ children }: PropsChildren) => {
  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <Header isSignIn showMenu={false} />
      <Grid component="main" sx={{ minHeight: '100vh', marginTop: { xs: '50px', md: '90px' } }}>
        {children}
      </Grid>
      <Copyright sx={{ mt: 5, mb: 1 }} />
    </ThemeProvider>
  );
};

export default LayoutHome;
