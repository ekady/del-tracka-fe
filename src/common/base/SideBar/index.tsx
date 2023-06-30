import { ReactNode, useCallback } from 'react';

// Next Components
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

// MUI Components
import {
  Toolbar,
  Typography,
  Box,
  SwipeableDrawer,
  List,
  Divider,
  ListItemIcon,
  ListItemText,
  Icon,
  Container,
} from '@mui/material';

// MUI utils
import { useTheme } from '@mui/material/styles';

// Icon
import { IconLogo } from '@/common/icons';

// Local Components
import { Drawer, ListItem } from './styled';

import { menu } from '@/common/constants';
import { IMenuItem, FunctionVoid } from '@/common/types';

export interface SideBarProps {
  isOpen: boolean;
  isMobile: boolean;
  handleOpenDrawer: FunctionVoid;
}

const SideBar = ({ isOpen, handleOpenDrawer, isMobile }: SideBarProps) => {
  const theme = useTheme();
  const mainPath = useRouter().pathname;

  const toggleDrawer = useCallback(
    (isClickList: boolean): FunctionVoid => {
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
          <Toolbar disableGutters />
          {list}
          <Divider />
        </Drawer>
      )}
    </>
  );
};

export default SideBar;
