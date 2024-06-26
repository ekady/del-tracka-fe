// React
import { ReactNode } from 'react';

// Next
import dynamic from 'next/dynamic';

// MUI Components
import type { Breakpoint } from '@mui/material';
import { PaperProps } from '@mui/material/Paper';

// MUI utils
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// Constant
import { SIDEBAR_WIDTH } from '@/common/base/SideBar/constants';

const Box = dynamic(() => import('@mui/material/Box'), { ssr: false });
const Drawer = dynamic(() => import('@mui/material/Drawer'), { ssr: false });

export interface ILayoutDefaultWithDrawerProps {
  menuList: ReactNode;
  content: ReactNode;
  hideContent?: boolean;
  hideMenu?: boolean;
  mediaQueryForShow?: Breakpoint;
  isMenu?: boolean;
}

const drawerWidth = SIDEBAR_WIDTH + 40;

const LayoutDrawerAdditional = ({
  menuList,
  content,
  hideMenu,
  mediaQueryForShow,
  isMenu,
}: ILayoutDefaultWithDrawerProps) => {
  const theme = useTheme();
  const lgAndUp = useMediaQuery(theme.breakpoints.up('lg'));
  const showQuery = useMediaQuery(theme.breakpoints.up(mediaQueryForShow ?? 'lg'));
  const hideMenuQuery = hideMenu && !showQuery;

  const paperProps: PaperProps = {
    sx: {
      position: 'absolute',
      bottom: 0,
      marginTop: '-20px',
      pt: 3,
      zIndex: 1,
      height: 'unset',
      marginLeft: lgAndUp ? '-24px' : '0px',
      backgroundColor: 'transparent',
    },
  };

  const drawerStyle = {
    width: drawerWidth,
    height: '100%',
    marginLeft: lgAndUp ? '-24px' : '0px',
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: drawerWidth,
      boxSizing: 'border-box',
    },
  };

  const contentStyle = { flexGrow: 1, pl: { xs: 0, lg: 3 }, height: '100%', overflow: 'hidden' };

  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      {!hideMenuQuery && (
        <Drawer sx={drawerStyle} variant="permanent" anchor="left" PaperProps={paperProps}>
          {menuList}
        </Drawer>
      )}
      <Box component="main" sx={contentStyle}>
        {isMenu && !showQuery ? menuList : content}
      </Box>
    </Box>
  );
};

export default LayoutDrawerAdditional;
