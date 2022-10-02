import { ReactNode, useCallback } from 'react';

// Next
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { signOut } from 'next-auth/react';

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
import { useAppDispatch } from '@/common/store';
import { resetState } from '@/features/auth/store/auth.slice';
import useHeaderMenu from './useHeaderMenu';
import { useLogoutMutation } from '@/features/auth/store/auth.api.slice';

export interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  sidebar?: boolean;
}

export interface HeaderProps {
  isSignIn: boolean;
  showMenu: boolean;
  usingSidebar?: boolean;
}

const Header = ({ isSignIn, showMenu, usingSidebar }: HeaderProps) => {
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();
  const router = useRouter();
  const theme = useTheme();
  const lgAndUp = useMediaQuery(theme.breakpoints.up('lg'));

  const { anchorEl, handleClose, handleMenu, handleSidebar, openSidebar } = useHeaderMenu();

  const onLogout = useCallback(async (): Promise<void> => {
    try {
      handleClose();
      dispatch(resetState());
      await logout().unwrap();
      signOut({ redirect: false });
      router.replace('/auth/sign-in');
    } catch {
      //
    }
  }, [dispatch, handleClose, logout, router]);

  const logInInfo: ReactNode = lgAndUp ? (
    <Button color="inherit" onClick={handleMenu} variant="text" startIcon={<AccountCircle />}>
      <Text sx={{ flexGrow: 1, ml: 1 }}>First Name</Text>
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
      <Image src={IconLogo} width={70} alt="logo" />
    );

  const logo: ReactNode = lgAndUp && (
    <LogoContainer>
      <Image src={IconLogo} width={70} alt="logo" />
    </LogoContainer>
  );

  return (
    <>
      <AppBar color="inherit" open={openSidebar} sidebar={usingSidebar}>
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
            {isSignIn ? (
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
                  <Link href="/settings" passHref>
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <Settings fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Settings</ListItemText>
                    </MenuItem>
                  </Link>
                  <Divider />
                  <MenuItem onClick={onLogout}>
                    <ListItemIcon>
                      <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Log Out</ListItemText>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button color="inherit">
                <Text>Log In</Text>
              </Button>
            )}
          </Container>
        </Toolbar>
      </AppBar>
      {showMenu && <SideBar isOpen={openSidebar} handleOpenDrawer={handleSidebar} isMobile={!lgAndUp} />}
    </>
  );
};

export default Header;
