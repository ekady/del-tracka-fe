'use client';

import { Container } from '@mui/material';

import { useGeneralStore } from '@/app/_common/store/general.store';
import { useThemeStore } from '@/app/_common/store/theme.store';
import { IPropsChildren, IUserInfoResponse } from '@/app/_common/types';

interface ILayoutContainerProps extends IPropsChildren {
  profile?: IUserInfoResponse | null;
}

const LayoutAppContainer = ({ children, profile }: ILayoutContainerProps) => {
  const isSidebarOpen = useGeneralStore((state) => state.isSidebarOpen);
  const themeMode = useThemeStore((state) => state.mode);

  return (
    <Container
      maxWidth={false}
      sx={{
        pt: 3,
        pb: 3,
        width: {
          lg: isSidebarOpen ? `calc(100% - 254px)` : '100%',
        },
        minHeight: {
          xs: `calc(100vh - ${profile?.isDemo ? '113px' : '64px'})`,
          sm: `calc(100vh - ${profile?.isDemo ? '95px' : '64px'})`,
        },
        height: '100%',
        backgroundColor: themeMode === 'dark' ? '#f4f4f426' : '#f4f4f4d6',
      }}
    >
      {children}
    </Container>
  );
};

export default LayoutAppContainer;
