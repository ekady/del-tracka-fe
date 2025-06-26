import { Metadata } from 'next';

import { redirect } from 'next/navigation';

import { Box, Grid } from '@mui/material';

import { actionFetchProfile } from '@/app/_common/actions/profile.action.utils';
import Header from '@/app/_common/base/Header';
import LayoutAppContainer from '@/app/_common/layout/LayoutApp/components/LayoutAppContainer';
import LayoutWrapper from '@/app/_common/layout/LayoutWrapper';
import { IPropsChildren } from '@/app/_common/types';

export const metadata: Metadata = {
  robots: 'noindex,nofollow',
};

const LayoutDefault = async ({ children }: IPropsChildren) => {
  const profile = await actionFetchProfile();

  if (!profile) redirect('/auth/sign-in');

  return (
    <LayoutWrapper>
      <Grid sx={{ flexGrow: 1, pt: { xs: profile?.isDemo ? 14 : 7, sm: profile?.isDemo ? 11 : 8 } }}>
        <Box sx={{ display: 'flex', width: '100%', height: '100%' }}>
          <Header showMenu isUsingSidebar />
          <LayoutAppContainer profile={profile}>{children}</LayoutAppContainer>
        </Box>
      </Grid>
    </LayoutWrapper>
  );
};

export default LayoutDefault;
