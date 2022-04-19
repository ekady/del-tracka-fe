import { useState, MouseEvent } from 'react';

// Next Component
import Image from 'next/image';

// Components
import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import {
  Box,
  AppBar as MuiAppBar,
  Container,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';

// Local Components
import SideBar from './SideBar';
import Breadcrumb from './Breadcrumb';

// Icons
import { Menu as MenuIcon, AccountCircle, Logout as LogoutIcon } from '@mui/icons-material';

// Local Icons
import { IconLogo } from '../../icons';

// Helper
import { useTheme, styled } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  sidebar?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'sidebar',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  width: '100%',
  marginLeft: 0,
}));

export interface HeaderProps {
  isSignIn: boolean;
  showMenu: boolean;
  usingSidebar?: boolean;
}

export default function Header({ isSignIn, showMenu, usingSidebar }: HeaderProps) {
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

  return (
    <>
      <AppBar
        color="inherit"
        sx={{ boxShadow: 'none', zIndex: lgAndUp ? theme.zIndex.drawer + 1 : theme.zIndex.drawer - 1 }}
        open={openSidebar}
        sidebar={usingSidebar}
      >
        <Toolbar disableGutters>
          {usingSidebar && (
            <Box sx={{ display: 'flex', width: lgAndUp ? 280 : 20, justifyContent: 'space-between', boxSizing: 'border-box' }}>
              {lgAndUp && (
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 2 }}>
                  <Image src={IconLogo} width={70} alt="logo" />
                </Box>
              )}
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
            </Box>
          )}
          <Container maxWidth={false} sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ flexGrow: 1 }}>
              {showMenu && usingSidebar ? (
                <Box sx={{ mx: lgAndUp ? 'unset' : 3 }}>
                  <Breadcrumb />
                </Box>
              ) : (
                <Typography>
                  <Image src={IconLogo} width={70} alt="logo" />
                </Typography>
              )}
            </Box>
            {isSignIn ? (
              <>
                {lgAndUp ? (
                  <Button color="inherit" onClick={handleMenu} variant="text" startIcon={<AccountCircle />}>
                    <Typography sx={{ flexGrow: 1, ml: 1, fonstSize: 'small', textTransform: 'capitalize' }}>
                      First Name
                    </Typography>
                  </Button>
                ) : (
                  <IconButton color="primary" onClick={handleMenu} aria-label="upload picture" component="span">
                    <AccountCircle />
                  </IconButton>
                )}
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  keepMounted
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Log Out</ListItemText>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button color="inherit">
                <Typography sx={{ fonstSize: 'small', textTransform: 'capitalize' }}>Log In</Typography>
              </Button>
            )}
          </Container>
        </Toolbar>
      </AppBar>
      {showMenu && <SideBar isOpen={openSidebar} handleOpenDrawer={handleSidebar} isMobile={!lgAndUp} />}
    </>
  );
}
