import { ElementType } from 'react';

import MuiDrawer from '@mui/material/Drawer';
import ListItemMUI from '@mui/material/ListItemButton';
import type { CSSObject, Theme } from '@mui/material';

import { styled } from '@mui/material/styles';

// Constant
import { SIDEBAR_WIDTH } from './constants';

const openedMixin = (theme: Theme): CSSObject => ({
  width: SIDEBAR_WIDTH,
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

export const Drawer: ElementType = styled(MuiDrawer, {
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

export const ListItem: ElementType = styled(ListItemMUI, {
  shouldForwardProp: (prop) => prop !== 'selected',
})(({ selected }) => ({
  border: '1px solid trasparent',
  borderRadius: 10,
  '&:hover': {
    backgroundColor: selected ? '#2B75B3' : '#91919136',
  },
}));
