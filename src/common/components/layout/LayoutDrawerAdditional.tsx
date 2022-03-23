// React
import { ReactNode } from 'react';

// MUI Components
import { Box, Drawer } from '@mui/material';

// Helper
import { useTheme, styled } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

export interface LayoutDefaultWithDrawerProps {
  menuList: ReactNode;
  content: ReactNode;
}

const drawerWidth = 290;

export default function LayoutDrawerAdditional({ menuList, content }: LayoutDefaultWithDrawerProps) {
  const theme = useTheme();
  const lgAndUp = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      <Drawer
        sx={{
          width: drawerWidth,
          height: '100%',
          marginLeft: lgAndUp ? '-24px' : '0px',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
        PaperProps={{
          sx: {
            position: 'absolute',
            bottom: 0,
            marginTop: '-20px',
            pt: 4,
            zIndex: 1,
            height: 'unset',
            marginLeft: lgAndUp ? '-24px' : '0px',
          },
        }}
      >
        {menuList}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, height: '100%' }}>
        {content}
      </Box>
    </Box>
  );
}
