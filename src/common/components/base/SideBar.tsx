// Next Components
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

// MUI Components
import {
  Drawer as MuiDrawer,
  Toolbar,
  Typography,
  Box,
  SwipeableDrawer,
  List,
  Divider,
  ListItemButton as ListItemMUI,
  ListItemIcon,
  ListItemText,
  Icon,
  Container,
} from '@mui/material';

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
  border: 'none',
  paddingLeft: 16,
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  border: 'none',
  width: 0,
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

const ListItem = styled(ListItemMUI, {
  shouldForwardProp: (prop) => prop !== 'selected',
})(({ selected }) => ({
  border: '1px solid trasparent',
  borderRadius: 10,
  '&:hover': {
    backgroundColor: selected ? '#2B75B3' : '#eee',
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
  const mainPath = useRouter().pathname.match(/^\/((\w|-)*)/);
  const currentRouter = mainPath ? mainPath[0] : '';

  const list = () => (
    <Box sx={{ py: 1 }} role="presentation" onClick={() => toggleDrawer(true)} onKeyDown={() => toggleDrawer(true)}>
      <List>
        {menu.map(({ path, name, icon }: menuItem) => (
          <Link href={path} passHref key={path}>
            <ListItem
              selected={currentRouter === path}
              sx={{ background: currentRouter === path ? theme.palette.primary.main : null, mb: 1 }}
            >
              <ListItemIcon>
                <Icon sx={{ color: currentRouter === path ? theme.palette.common.white : null }}>{icon}</Icon>
              </ListItemIcon>
              <ListItemText primary={name} sx={{ color: currentRouter === path ? theme.palette.common.white : null }} />
            </ListItem>
          </Link>
        ))}
      </List>
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
            <Container>
              <Typography sx={{ flexGrow: 1 }}>
                <Image src={IconLogo} width={70} alt="logo" />
              </Typography>
            </Container>
          </Toolbar>
          <Divider />
          <Container>{list()}</Container>
          <Divider />
        </SwipeableDrawer>
      ) : (
        <Drawer open={isOpen} variant="permanent" sx={{ boxSizing: 'border-box' }}>
          <Toolbar disableGutters />
          {list()}
          <Divider />
        </Drawer>
      )}
    </>
  );
}
