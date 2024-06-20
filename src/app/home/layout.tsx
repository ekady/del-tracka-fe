import { Grid } from '@mui/material';

import Copyright from '@/app/_common/base/Copyright';
import Header from '@/app/_common/base/Header';
import LayoutWrapper from '@/app/_common/layout/LayoutWrapper';
import { IPropsChildren } from '@/app/_common/types';

const LayoutHome = async ({ children }: IPropsChildren) => {
  return (
    <LayoutWrapper>
      <Header showMenu={false} />
      <Grid sx={{ minHeight: '100vh', marginTop: { xs: '50px', md: '90px' } }}>{children}</Grid>
      <Copyright sx={{ mt: 5, mb: 2 }} />
    </LayoutWrapper>
  );
};

export default LayoutHome;
