import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MailIcon from '@mui/icons-material/Mail';
import { Drawer as MuiDrawer, Toolbar } from '@mui/material';
import { styled, Theme, CSSObject } from '@mui/material/styles';

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
  const toggleDrawer = () => handleOpenDrawer();

  const list = () => (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer} onKeyDown={toggleDrawer}>
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <>
      {isMobile ? (
        <SwipeableDrawer disableBackdropTransition anchor="left" open={isOpen} onClose={toggleDrawer} onOpen={toggleDrawer}>
          {list()}
        </SwipeableDrawer>
      ) : (
        <Drawer open={isOpen} variant="permanent">
          <Toolbar />
          <List>
            <ListItem
              sx={{
                justifyContent: isOpen ? 'flex-end' : 'flex-start',
              }}
            >
              <IconButton onClick={toggleDrawer}>{isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}</IconButton>
            </ListItem>
            <Divider />
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      )}
    </>
  );
}
