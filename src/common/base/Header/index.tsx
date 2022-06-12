import { useState, MouseEvent, ReactNode } from 'react';

// Next
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

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
} from '@mui/material';

import { Menu as MenuIcon, AccountCircle, Logout as LogoutIcon, Settings } from '@mui/icons-material';

import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

// Local Components
import Breadcrumb from '../Breadcrumb';
import SideBar from '../SideBar';
import { AppBar, LogoContainer, Text, TitleContainer } from './styled';

// Local Icons
import { IconLogo } from '@/common/icons';

// Hooks
import { useAppDispatch } from '@/common/store/store';
import { resetState } from '@/features/Auth/store/auth.slice';

export type AppBarProps = MuiAppBarProps & {
  open?: boolean;
  sidebar?: boolean;
};

export type HeaderProps = {
  isSignIn: boolean;
  showMenu: boolean;
  usingSidebar?: boolean;
};

const Header = ({ isSignIn, showMenu, usingSidebar }: HeaderProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const theme = useTheme();
  const lgAndUp = useMediaQuery(theme.breakpoints.up('lg'));

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openSidebar, setOpenSidebar] = useState<boolean>(true);

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  const onLogout = () => {
    handleClose();
    dispatch(resetState());
    router.push('/sign-in');
  };

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
