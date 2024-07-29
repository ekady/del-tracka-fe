import Image from 'next/image';

import { Alert, Box, Container, Toolbar, Typography } from '@mui/material';

import { actionFetchUnreadNotifications } from '@/app/_common/actions/notification.action.utils';
import { actionFetchPermissions } from '@/app/_common/actions/permission.action.utils';
import { actionFetchProfile } from '@/app/_common/actions/profile.action.utils';
import { IconLogo } from '@/app/_common/icons';
import { IPermission } from '@/app/_common/types';
import { INotificationResponse } from '@/app/_common/types/notification.type';

import HeaderAppBar from './HeaderAppBar';
import HeaderMenu from './HeaderMenu';
import HeaderSidebarButton from './HeaderSidebarButton';
import SideBar from '../SideBar';

export interface IHeaderProps {
  showMenu: boolean;
  isUsingSidebar?: boolean;
}

const Header = async ({ isUsingSidebar, showMenu }: IHeaderProps) => {
  const profile = await actionFetchProfile();

  let permissions: IPermission[] = [];
  let notifications: INotificationResponse[] = [];

  if (profile) {
    permissions = await actionFetchPermissions();
    const responseNotifications = await actionFetchUnreadNotifications({ limit: 5 });
    notifications = responseNotifications.data;
  }

  return (
    <>
      <HeaderAppBar isUsingSidebar={isUsingSidebar}>
        <Toolbar disableGutters sx={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          {profile?.isDemo && isUsingSidebar && (
            <Alert icon={false} severity="warning" sx={{ width: '100%', py: 0 }}>
              You&apos;re currently using a{' '}
              <Typography fontWeight="bold" display="inline-block" fontSize={12.25}>
                demo account
              </Typography>
              , and creating a new project is not available with this account type
            </Alert>
          )}

          <Box width="100%" display="flex" alignItems="center">
            <Container
              maxWidth={false}
              sx={{
                display: 'grid',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: profile?.isDemo ? 60 : 52,
                gap: 2,
                gridTemplateColumns: { xs: '1fr 1fr auto', lg: '250px 1fr auto' },
              }}
            >
              {profile?.email && isUsingSidebar ? (
                <HeaderSidebarButton />
              ) : (
                <Image src={IconLogo} width={70} alt="logo" priority />
              )}
              <Box sx={{ alignItems: 'center', display: 'flex' }}>{/* TODO: Add Search Feature */}</Box>
              <HeaderMenu profile={profile} permissions={permissions} notifications={notifications} />
            </Container>
          </Box>
        </Toolbar>
      </HeaderAppBar>

      {showMenu && <SideBar profile={profile} />}
    </>
  );
};

export default Header;
