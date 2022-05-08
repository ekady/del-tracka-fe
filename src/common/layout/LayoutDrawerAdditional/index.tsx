// React
import { ReactNode } from 'react';

// MUI Components
import { Box, Drawer, PaperProps } from '@mui/material';

// Helper
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

// Constant
import { SIDEBAR_WIDTH } from '@/common/base/SideBar/constants';

export type LayoutDefaultWithDrawerProps = {
  menuList: ReactNode;
  content: ReactNode;
};

const drawerWidth = SIDEBAR_WIDTH + 40;

const LayoutDrawerAdditional = ({ menuList, content }: LayoutDefaultWithDrawerProps) => {
  const theme = useTheme();
  const lgAndUp = useMediaQuery(theme.breakpoints.up('lg'));

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
      <Drawer sx={drawerStyle} variant="permanent" anchor="left" PaperProps={paperProps}>
        {menuList}
      </Drawer>
      <Box component="main" sx={contentStyle}>
        {content}
      </Box>
    </Box>
  );
};

export default LayoutDrawerAdditional;
