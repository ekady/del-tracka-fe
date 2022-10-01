import { AppBar as MuiAppBar, Box, styled, Typography } from '@mui/material';
import { SIDEBAR_WIDTH } from '../SideBar/constants';

import { AppBarProps } from '.';

export const AppBar = styled(MuiAppBar, {
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
  boxShadow: 'none',
  zIndex: theme.zIndex.drawer - 1,
  [theme.breakpoints.up('lg')]: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

export const TitleContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: 20,
  justifyContent: 'space-between',
  boxSizing: 'border-box',

  [theme.breakpoints.up('lg')]: {
    width: SIDEBAR_WIDTH + 70,
    paddingLeft: 16,
  },
}));

export const LogoContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  pl: 2,
}));

export const Text = styled(Typography)(() => ({
  fontSize: '14',
  textTransform: 'capitalize',
}));
