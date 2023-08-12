// MUI Components
import Grid from '@mui/material/Grid';

// Local Components
import { Copyright, Header } from '@/common/base';
import LayoutWrapper from '../LayoutWrapper';

import { IPropsChildren } from '@/common/types';

const LayoutHome = ({ children }: IPropsChildren) => {
  return (
    <LayoutWrapper>
      <Header showMenu={false} />
      <Grid component="main" sx={{ minHeight: '100vh', marginTop: { xs: '50px', md: '90px' } }}>
        {children}
      </Grid>
      <Copyright sx={{ mt: 5, mb: 2 }} />
    </LayoutWrapper>
  );
};

export default LayoutHome;
