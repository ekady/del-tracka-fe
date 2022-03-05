import { useState, MouseEvent } from 'react';

// Next Component
import Image from 'next/image';

// Components
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Box } from '@mui/material';

// Local Components
import SideBar from './SideBar';
import Breadcrumb from './Breadcrumb';

// Icons
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

// Local Icons
import { IconLogo } from '../../icons';

// Helper
import { useTheme, styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  sidebar?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'sidebar',
})<AppBarProps>(({ theme, open, sidebar }) => ({
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
  [theme.breakpoints.up('md')]: {
    width: open && sidebar ? 'calc(100% - 250px)' : sidebar ? `calc(100% - ${theme.spacing(9)})` : '100%',
    marginLeft: open ? `calc(${theme.spacing(9)} + 1px)` : '250px',
  },
}));

export interface HeaderProps {
  isSignIn: boolean;
  showMenu: boolean;
  usingSidebar?: boolean;
}

export default function Header({ isSignIn, showMenu, usingSidebar }: HeaderProps) {
  const theme = useTheme();
  const mdAndUp = useMediaQuery(theme.breakpoints.up('md'));

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);

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
      <AppBar color="inherit" sx={{ boxShadow: 1 }} open={openSidebar} sidebar={usingSidebar}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <IconButton
              onClick={handleSidebar}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2, display: mdAndUp || !showMenu ? 'none' : 'block' }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ flexGrow: 1 }}>
              {showMenu ? (
                <Breadcrumb />
              ) : (
                <Typography>
                  <Image src={IconLogo} width={70} alt="logo" />
                </Typography>
              )}
            </Box>
            {isSignIn ? (
              <>
                {mdAndUp ? (
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
          </Toolbar>
        </Container>
      </AppBar>
      {showMenu && <SideBar isOpen={openSidebar} handleOpenDrawer={handleSidebar} isMobile={!mdAndUp} />}
    </>
  );
}
