'use client';

import { MouseEvent, useCallback, useState } from 'react';

import Link from 'next/link';

import { Help, Logout, Person } from '@mui/icons-material';
import { Box, Button, Divider, IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';

import HeaderDialogPermission from '@/app/_common/base/Header/HeaderDialogPermission';
import HeaderNotification from '@/app/_common/base/Header/HeaderNotification';
import HeaderProfilePicture from '@/app/_common/base/Header/HeaderProfilePicture';
import { useThemeStore } from '@/app/_common/store/theme.store';
import { IPermission, IUserInfoResponse } from '@/app/_common/types';
import { INotificationResponse } from '@/app/_common/types/notification.type';

import { LoginInfoDesktopContainer, LoginInfoMobileContainer, Text, ThemeSwitcher } from './styled';

interface IHeaderMenuProps {
  profile: IUserInfoResponse | null;
  permissions: IPermission[];
  notifications: INotificationResponse[];
}

const HeaderMenu = ({ profile, permissions, notifications }: IHeaderMenuProps) => {
  const colorMode = useThemeStore((state) => state.mode);
  const setColorMode = useThemeStore((state) => state.setMode);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const handleMenu = useCallback((event: MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleMenuClose = useCallback((): void => {
    setAnchorEl(null);
  }, []);

  const changeColorTheme = useCallback(() => {
    const setTo = colorMode === 'light' ? 'dark' : 'light';
    setColorMode(setTo);
    handleMenuClose();
  }, [colorMode, handleMenuClose, setColorMode]);

  if (profile?.email) {
    return (
      <>
        <LoginInfoDesktopContainer>
          <ThemeSwitcher sx={{ m: 1 }} checked={colorMode === 'dark'} onChange={changeColorTheme} />
          <HeaderNotification notifications={notifications} />
          <Button color="inherit" onClick={handleMenu} variant="text">
            <HeaderProfilePicture image={profile.picture} />
            <Text
              sx={{
                flexGrow: 1,
                ml: 1,
                whiteSpace: 'nowrap',
                display: {
                  xs: 'none',
                  md: 'block',
                },
              }}
            >
              {profile.firstName} {profile.lastName}
            </Text>
          </Button>
        </LoginInfoDesktopContainer>

        <LoginInfoMobileContainer>
          <ThemeSwitcher sx={{ m: 1 }} checked={colorMode === 'dark'} onChange={changeColorTheme} />
          <HeaderNotification notifications={notifications} />
          <IconButton color="primary" onClick={handleMenu} aria-label="picture" component="span">
            <HeaderProfilePicture image={profile.picture} />
          </IconButton>
        </LoginInfoMobileContainer>

        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          onClick={handleMenuClose}
        >
          <Link href="/app/profile">
            <MenuItem>
              <ListItemIcon>
                <Person fontSize="small" />
              </ListItemIcon>
              <ListItemText>Profile</ListItemText>
            </MenuItem>
          </Link>
          <MenuItem onClick={() => setIsHelpOpen(true)}>
            <ListItemIcon>
              <Help fontSize="small" />
            </ListItemIcon>
            <ListItemText>Permission Information</ListItemText>
          </MenuItem>
          <Divider />
          <Link href="/auth/logout">
            <MenuItem>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              <ListItemText>Log Out</ListItemText>
            </MenuItem>
          </Link>
        </Menu>

        <HeaderDialogPermission open={isHelpOpen} onCloseHelp={() => setIsHelpOpen(false)} permissions={permissions} />
      </>
    );
  }

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <ThemeSwitcher sx={{ m: 1 }} checked={colorMode === 'dark'} onChange={changeColorTheme} />
      <Button color="inherit" LinkComponent={Link} href="/auth/sign-in">
        <Text>Log In</Text>
      </Button>
    </Box>
  );
};

export default HeaderMenu;
