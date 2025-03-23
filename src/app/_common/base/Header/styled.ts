'use client';

import { ElementType } from 'react';

import { IconButton, Switch, SwitchProps } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { SIDEBAR_WIDTH } from '@/app/_common/base/SideBar/constants';

export interface IAppBarProps extends MuiAppBarProps {
  open?: boolean;
  sidebar?: boolean;
}

export const AppBar: ElementType = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'sidebar',
})<IAppBarProps>(({ theme, open }) => ({
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

export const TitleContainer: ElementType = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: 20,
  justifyContent: 'flex-start',
  gap: 12,
  boxSizing: 'border-box',

  [theme.breakpoints.up('lg')]: {
    width: SIDEBAR_WIDTH,
  },
}));

export const LogoContainer: ElementType = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  pl: 2,

  [theme.breakpoints.down('lg')]: {
    display: 'none',
  },
}));

export const Text: ElementType = styled(Typography)(() => ({
  fontSize: '14',
  textTransform: 'capitalize',
}));

export const MenuIconButtonContainer: ElementType = styled(IconButton)(() => ({
  display: 'block',
  lineHeight: 0,
}));

export const LoginInfoDesktopContainer: ElementType = styled(Box)(({ theme }) => ({
  display: 'none',

  [theme.breakpoints.up('lg')]: {
    display: 'flex',
    alignItems: 'center',
  },
}));

export const LoginInfoMobileContainer: ElementType = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',

  [theme.breakpoints.up('lg')]: {
    display: 'none',
  },
}));

export const ThemeSwitcher: ElementType<SwitchProps> = styled(Switch)(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          theme.palette.primary.main,
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#BDBDBD',
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#FFFF',
    height: 22,
    '&::before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        theme.palette.primary.main,
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));
