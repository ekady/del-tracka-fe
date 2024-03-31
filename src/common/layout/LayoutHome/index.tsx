import dynamic from 'next/dynamic';

import { IPropsChildren } from '@/common/types';

const Grid = dynamic(() => import('@mui/material/Grid'));
const LayoutWrapper = dynamic(() => import('../LayoutWrapper'), { ssr: false });
const Header = dynamic(() => import('@/common/base/Header'), { ssr: false });
const Copyright = dynamic(() => import('@/common/base/Copyright'), { ssr: false });

const LayoutHome = ({ children }: IPropsChildren) => {
  return (
    <LayoutWrapper>
      <Header showMenu={false} />
      <Grid sx={{ minHeight: '100vh', marginTop: { xs: '50px', md: '90px' } }}>{children}</Grid>
      <Copyright sx={{ mt: 5, mb: 2 }} />
    </LayoutWrapper>
  );
};

export default LayoutHome;
