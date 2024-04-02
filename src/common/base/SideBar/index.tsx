import { ReactNode, useCallback } from 'react';

// Next Components
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

// MUI Components
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Icon from '@mui/material/Icon';
import Container from '@mui/material/Container';

// MUI utils
import { useTheme } from '@mui/material/styles';

// Icon
import { IconLogo } from '@/common/icons';

// Local Components
import { Drawer, ListItem } from './styled';

import { menu } from '@/common/constants';
import { IMenuItem, TFunctionVoid } from '@/common/types';
import { useGetProfileQuery } from '@/common/store/api.slice';

export interface ISideBarProps {
  isOpen: boolean;
  isMobile: boolean;
  handleOpenDrawer: TFunctionVoid;
}

const SideBar = ({ isOpen, handleOpenDrawer, isMobile }: ISideBarProps) => {
  const theme = useTheme();
  const mainPath = useRouter().pathname;
  const { data } = useGetProfileQuery();

  const toggleDrawer = useCallback(
    (isClickList: boolean): TFunctionVoid => {
      return () => {
        if ((isMobile && isClickList) || !isClickList) handleOpenDrawer();
      };
    },
    [handleOpenDrawer, isMobile],
  );

  const list: ReactNode = (
    <Box sx={{ py: 1 }} role="presentation" onClick={toggleDrawer(true)} onKeyDown={toggleDrawer(true)}>
      <List>
        {menu.map(({ path, name, icon }: IMenuItem) => (
          <Link href={path} passHref key={path}>
            <ListItem
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
          <Toolbar disableGutters sx={{ height: data?.data?.isDemo ? '88px' : '64px' }} />
          {list}
          <Divider />
        </Drawer>
      )}
    </>
  );
};

export default SideBar;
