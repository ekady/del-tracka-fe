// MUI Components
import { Grid } from '@mui/material';

// Utils
import { ThemeProvider } from '@mui/material/styles';

// Local Components
import { Copyright, Header } from '@/common/base';

import { IPropsChildren } from '@/common/types';

import theme from '@/theme';

const LayoutHome = ({ children }: IPropsChildren) => {
  return (
    <ThemeProvider theme={theme}>
      <Header showMenu={false} />
      <Grid component="main" sx={{ minHeight: '100vh', marginTop: { xs: '50px', md: '90px' } }}>
        {children}
      </Grid>
      <Copyright sx={{ mt: 5, mb: 1 }} />
    </ThemeProvider>
  );
};

export default LayoutHome;
