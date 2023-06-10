import { ReactNode, useCallback } from 'react';

// Next
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// MUI
import {
  Box,
  Container,
  Toolbar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  ListItemText,
  ListItemIcon,
  Divider,
  AppBarProps as MuiAppBarProps,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { Menu as MenuIcon, AccountCircle, Logout as LogoutIcon, Settings } from '@mui/icons-material';

// Local Components
import Breadcrumb from '../Breadcrumb';
import SideBar from '../SideBar';
import { AppBar, LogoContainer, Text, TitleContainer } from './styled';

// Local Icons
import { IconLogo } from '@/common/icons';

// Hooks
import useHeaderMenu from './useHeaderMenu';
import { useGetProfileQuery } from '@/common/store/api.slice';
import { convertFilePathToUrl } from '@/common/helper/convert';
import { useLogout } from '@/common/hooks/useLogout';

export interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  sidebar?: boolean;
}

export interface HeaderProps {
  showMenu: boolean;
  usingSidebar?: boolean;
}

const Header = ({ showMenu, usingSidebar }: HeaderProps) => {
  const pathname = usePathname() || '';
  const theme = useTheme();
  const { data } = useGetProfileQuery(undefined, { skip: !pathname?.includes('app') });
  const lgAndUp = useMediaQuery(theme.breakpoints.up('lg'));
  const logout = useLogout();

  const { anchorEl, handleClose, handleMenu, handleSidebar, sidebarOpen } = useHeaderMenu();

  const onLogout = useCallback(() => {
    handleClose();
    logout().catch(() => {
      //
    });
  }, [handleClose, logout]);

  const logInInfo: ReactNode = lgAndUp ? (
    <Button
      color="inherit"
      onClick={handleMenu}
      variant="text"
      startIcon={
        data?.data.picture ? (
          <Image
            src={convertFilePathToUrl(data.data.picture.src)}
            alt="profile"
            height={24}
            width={24}
            style={{ borderRadius: '50%' }}
          />
        ) : (
          <AccountCircle />
        )
      }
    >
      <Text sx={{ flexGrow: 1, ml: 1 }}>
        {data?.data.firstName} {data?.data.lastName}
      </Text>
    </Button>
  ) : (
    <IconButton color="primary" onClick={handleMenu} aria-label="upload picture" component="span">
      <AccountCircle />
    </IconButton>
  );

  const menuInfo: ReactNode =
    showMenu && usingSidebar ? (
      <Box sx={{ mx: lgAndUp ? 'unset' : 3 }}>
        <Breadcrumb />
      </Box>
    ) : (
      <Image src={IconLogo} width={70} alt="logo" priority />
    );

  const logo: ReactNode = lgAndUp && (
    <LogoContainer>
      <Image src={IconLogo} width={70} alt="logo" priority />
    </LogoContainer>
  );

  return (
    <>
      <AppBar color="inherit" open={sidebarOpen} sidebar={usingSidebar}>
        <Toolbar disableGutters>
          {usingSidebar && (
            <TitleContainer>
              {logo}
              <IconButton
                onClick={handleSidebar}
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ display: 'block', mx: lgAndUp ? 'unset' : 2 }}
              >
                <MenuIcon />
              </IconButton>
            </TitleContainer>
          )}
          <Container maxWidth={false} sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ flexGrow: 1 }}>{menuInfo}</Box>
            {data?.data.email ? (
              <>
                {logInInfo}
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  keepMounted
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <Link href="/app/settings" passHref>
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <Settings fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Settings</ListItemText>
                    </MenuItem>
                  </Link>
                  <Divider />
                  <MenuItem onClick={() => onLogout()}>
                    <ListItemIcon>
                      <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Log Out</ListItemText>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Link href="/auth/sign-in" passHref>
                <Button color="inherit">
                  <Text>Log In</Text>
                </Button>
              </Link>
            )}
          </Container>
        </Toolbar>
      </AppBar>
      {showMenu && <SideBar isOpen={sidebarOpen} handleOpenDrawer={handleSidebar} isMobile={!lgAndUp} />}
    </>
  );
};

export default Header;
