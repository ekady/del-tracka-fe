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

// Local Types
import { SideBarProps } from './type';

// Constant
import { menu } from '@/common/constants';
import { menuItem } from '@/common/types';

const SideBar = ({ isOpen, handleOpenDrawer, isMobile }: SideBarProps) => {
  const theme = useTheme();
  const mainPath = useRouter().pathname.match(/^\/((\w|-)*)/);
  const currentRouter = mainPath ? mainPath[0] : '';

  const toggleDrawer = (isClickList: boolean) => {
    return () => {
      if ((isMobile && isClickList) || !isClickList) handleOpenDrawer();
    };
  };

  const list = (
    <Box sx={{ py: 1 }} role="presentation" onClick={toggleDrawer(true)} onKeyDown={toggleDrawer(true)}>
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
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(false)}
        >
          <Toolbar disableGutters>
            <Container>
              <Typography sx={{ flexGrow: 1 }}>
                <Image src={IconLogo} width={70} alt="logo" />
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
