// Next Components
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

// MUI Components
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Drawer as MuiDrawer, Toolbar, Typography } from '@mui/material';

// MUI Icons
import Icon from '@mui/material/Icon';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// MUI utils
import { styled, Theme, CSSObject, useTheme } from '@mui/material/styles';

// Icon
import { IconLogo } from '@/common/icons';

// Constant
import { menu } from '@/common/constants';
import { menuItem } from '@/common/constants/menu';

const openedMixin = (theme: Theme): CSSObject => ({
  width: 250,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: 250,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const IconButton = styled(Box)(() => ({
  cursor: 'pointer',
  borderRadius: '50%',
  height: 24,
  width: 24,
  '&:hover': {
    backgroundColor: '#eee',
  },
}));

export interface SideBarProps {
  isOpen: boolean;
  isMobile: boolean;
  handleOpenDrawer: () => void;
}

export default function SideBar({ isOpen, handleOpenDrawer, isMobile }: SideBarProps) {
  const toggleDrawer = (isClickList: boolean) => {
    if ((isMobile && isClickList) || !isClickList) handleOpenDrawer();
  };
  const theme = useTheme();
  const currentRouter = useRouter().pathname;

  const list = () => (
    <Box sx={{ width: 250 }} role="presentation" onClick={() => toggleDrawer(true)} onKeyDown={() => toggleDrawer(true)}>
      <List>
        {menu.map(({ path, name, icon }: menuItem) => (
          <Link href={path} passHref key={path}>
            <ListItem button sx={{ background: currentRouter === path ? theme.palette.primary.main : null }}>
              <ListItemIcon>
                <Icon sx={{ color: currentRouter === path ? theme.palette.common.white : null }}>{icon}</Icon>
              </ListItemIcon>
              <ListItemText primary={name} sx={{ color: currentRouter === path ? theme.palette.common.white : null }} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <>
      {isMobile ? (
        <SwipeableDrawer
          disableBackdropTransition
          anchor="left"
          open={isOpen}
          onClose={() => toggleDrawer(false)}
          onOpen={() => toggleDrawer(false)}
        >
          <Toolbar disableGutters>
            <ListItem sx={{ py: 0 }}>
              <Typography sx={{ flexGrow: 1 }}>
                <Image src={IconLogo} width={70} alt="logo" />
              </Typography>
            </ListItem>
          </Toolbar>
          <Divider />
          {list()}
        </SwipeableDrawer>
      ) : (
        <Drawer open={isOpen} variant="permanent">
          <Toolbar disableGutters>
            <ListItem sx={{ justifyContent: isOpen ? 'space-between' : 'flex-start', py: 0 }}>
              <Box sx={{ display: isOpen ? 'flex' : 'none', alignItems: 'center' }}>
                <Image src={IconLogo} width={70} alt="logo" />
              </Box>
              <IconButton onClick={() => toggleDrawer(false)}>{isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}</IconButton>
            </ListItem>
          </Toolbar>
          <Divider />
          {list()}
        </Drawer>
      )}
    </>
  );
}
