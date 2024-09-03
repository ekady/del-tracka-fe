'use client';

import { ReactNode, useCallback } from 'react';

// Next Components
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Icon from '@mui/material/Icon';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useTheme } from '@mui/material/styles';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { menu } from '@/app/_common/constants';
import { IconLogo } from '@/app/_common/icons';
import { useGeneralStore } from '@/app/_common/store/general.store';
import { IMenuItem, IUserInfoResponse, TFunctionVoid } from '@/app/_common/types';

import { Drawer, ListItem } from './styled';

interface ISidebarProps {
  profile?: IUserInfoResponse | null;
}

const SideBar = ({ profile }: ISidebarProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const mainPath = usePathname();

  const isOpen = useGeneralStore((state) => state.isSidebarOpen);
  const toggleSidebar = useGeneralStore((state) => state.setSidebar);

  const toggleDrawer = useCallback(
    (isClickList: boolean): TFunctionVoid => {
      return () => {
        if ((isMobile && isClickList) || !isClickList) toggleSidebar(!isOpen);
      };
    },
    [isMobile, isOpen, toggleSidebar],
  );

  const list: ReactNode = (
    <Box sx={{ py: 1 }} role="presentation" onClick={toggleDrawer(true)} onKeyDown={toggleDrawer(true)}>
      <List>
        {menu.map(({ path, name, icon }: IMenuItem) => (
          <ListItem
            key={path}
            LinkComponent={Link}
            href={path}
            selected={mainPath.includes(path)}
            sx={{ background: mainPath.includes(path) ? theme.palette.primary.main : null, mb: 1 }}
          >
            <ListItemIcon>
              <Icon
                sx={{
                  color: mainPath.includes(path) ? theme.palette.getContrastText(theme.palette.primary.main) : null,
                }}
              >
                {icon}
              </Icon>
            </ListItemIcon>
            <ListItemText
              primary={name}
              sx={{
                color: mainPath.includes(path) ? theme.palette.getContrastText(theme.palette.primary.main) : null,
              }}
            />
          </ListItem>
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
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(false)}
        >
          <Toolbar disableGutters>
            <Container>
              <Typography sx={{ flexGrow: 1 }}>
                <Image src={IconLogo} width={70} alt="logo" priority />
              </Typography>
            </Container>
          </Toolbar>
          <Divider />
          <Container>{list}</Container>
          <Divider />
        </SwipeableDrawer>
      ) : (
        <Drawer open={isOpen} variant="permanent" sx={{ boxSizing: 'border-box' }}>
          <Toolbar disableGutters sx={{ height: profile?.isDemo ? '88px' : '64px' }} />
          <Box sx={{ paddingRight: 2 }}>{list}</Box>
        </Drawer>
      )}
    </>
  );
};

export default SideBar;
