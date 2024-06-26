import { ReactNode, useCallback, useState } from 'react';

// Next
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

// MUI
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Person from '@mui/icons-material/Person';
import DarkMode from '@mui/icons-material/DarkMode';
import LightMode from '@mui/icons-material/LightMode';
import Help from '@mui/icons-material/Help';

// Local Components
import Breadcrumb from '../Breadcrumb';
import SideBar from '../SideBar';
import { AppBar, LogoContainer, Text, TitleContainer } from './styled';

// Local Icons
import { IconLogo } from '@/common/icons';

// Hooks
import useHeaderMenu from './useHeaderMenu';
import { useGetProfileQuery } from '@/common/store/api.slice';
import NotificationMenu from '@/features/notifications/components/NotificationMenu';
import { useAppDispatch, useAppSelector } from '@/common/store';
import { selectColorTheme } from '@/common/store/selector';
import { setColorTheme } from '@/common/store/general.slice';
import ImageLoader from '../ImageLoader';
import { IFileStream } from '@/common/types';
import ProjectHelpDialog from '@/features/projects/components/ProjectHelpDialog';

export interface IAppBarProps extends MuiAppBarProps {
  open?: boolean;
  sidebar?: boolean;
}

export interface IHeaderProps {
  showMenu: boolean;
  usingSidebar?: boolean;
}

const ProfilePicture = ({ image }: { image?: string | IFileStream | null }) => {
  if (!image) return <AccountCircle />;

  return typeof image === 'string' ? (
    <Image src={image} alt="profile" height={24} width={24} style={{ borderRadius: '50%' }} />
  ) : (
    image && (
      <ImageLoader
        image={image}
        loaderSize={12}
        disabledReload
        imageProps={{
          alt: 'profile',
          height: 24,
          width: 24,
          style: { borderRadius: '50%' },
        }}
      />
    )
  );
};

const Header = ({ showMenu, usingSidebar }: IHeaderProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const theme = useTheme();
  const { data } = useGetProfileQuery(undefined, { skip: !router.asPath?.includes('app') });
  const colorTheme = useAppSelector(selectColorTheme);
  const lgAndUp = useMediaQuery(theme.breakpoints.up('lg'));

  const { anchorEl, handleClose, handleMenu, handleSidebar, sidebarOpen } = useHeaderMenu();
  const [helpOpen, setHelpOpen] = useState(false);

  const toggleDialogHelp = useCallback(() => {
    if (helpOpen) handleClose();
    setHelpOpen(!helpOpen);
  }, [handleClose, helpOpen]);

  const changeColorTheme = useCallback(() => {
    const changeTo = colorTheme === 'dark' ? 'light' : 'dark';
    dispatch(setColorTheme(changeTo));
    handleClose();
  }, [colorTheme, dispatch, handleClose]);

  const onLogout = useCallback(() => {
    handleClose();
    router.replace('/auth/logout');
  }, [handleClose, router]);

  const logInInfo: ReactNode = lgAndUp ? (
    <Box display="flex" alignItems="center" gap={2}>
      <NotificationMenu />
      <Button
        color="inherit"
        onClick={handleMenu}
        variant="text"
        startIcon={<ProfilePicture image={data?.data.picture} />}
      >
        <Text sx={{ flexGrow: 1, ml: 1 }}>
          {data?.data.firstName} {data?.data.lastName}
        </Text>
      </Button>
    </Box>
  ) : (
    <Box display="flex" alignItems="center" gap={2}>
      <NotificationMenu />
      <IconButton color="primary" onClick={handleMenu} aria-label="upload picture" component="span">
        <ProfilePicture image={data?.data.picture} />
      </IconButton>
    </Box>
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
        <Toolbar disableGutters sx={{ flexDirection: 'column' }}>
          {data?.data?.isDemo && (
            <Alert icon={false} severity="warning" sx={{ width: '100%', py: 0 }}>
              You&apos;re currently using a{' '}
              <Typography fontWeight="bold" display="inline-block" fontSize={12.25}>
                demo account
              </Typography>
              , and creating a new project is not available with this account type
            </Alert>
          )}
          <Box width="100%" display="flex" alignItems="center">
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
            <Container maxWidth={false} sx={{ display: 'flex', alignItems: 'center', height: 52 }}>
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
                    <Link href="/app/profile" passHref>
                      <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                          <Person fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Profile</ListItemText>
                      </MenuItem>
                    </Link>
                    <MenuItem onClick={changeColorTheme}>
                      <ListItemIcon>
                        {colorTheme === 'light' ? <DarkMode fontSize="small" /> : <LightMode fontSize="small" />}
                      </ListItemIcon>
                      <ListItemText>{colorTheme === 'light' ? 'Dark Mode' : 'Light Mode'}</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={toggleDialogHelp}>
                      <ListItemIcon>
                        <Help fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Help</ListItemText>
                    </MenuItem>
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
          </Box>
        </Toolbar>
      </AppBar>
      <ProjectHelpDialog open={helpOpen} onCloseHelp={toggleDialogHelp} />
      {showMenu && <SideBar isOpen={sidebarOpen} handleOpenDrawer={handleSidebar} isMobile={!lgAndUp} />}
    </>
  );
};

export default Header;
