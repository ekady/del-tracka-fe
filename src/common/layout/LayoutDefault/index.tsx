import dynamic from 'next/dynamic';

import { IPropsChildren } from '@/common/types';

import { useAppSelector } from '@/common/store';
import { selectColorTheme, selectSidebarOpen } from '@/common/store/selector';
import { useGetProfileQuery } from '@/common/store/api.slice';

const Box = dynamic(() => import('@mui/material/Box'), { ssr: false });
const Grid = dynamic(() => import('@mui/material/Grid'), { ssr: false });
const CssBaseline = dynamic(() => import('@mui/material/CssBaseline'), { ssr: false });
const Container = dynamic(() => import('@mui/material/Container'), { ssr: false });
const LayoutWrapper = dynamic(() => import('../LayoutWrapper'), { ssr: false });
const Header = dynamic(() => import('@/common/base/Header'), { ssr: false });

const LayoutDefault = ({ children }: IPropsChildren) => {
  const sidebarOpen = useAppSelector(selectSidebarOpen);
  const colorTheme = useAppSelector(selectColorTheme);
  const { data } = useGetProfileQuery();

  return (
    <LayoutWrapper>
      <Grid sx={{ flexGrow: 1, pt: { xs: data?.data?.isDemo ? 12 : 8, sm: data?.data?.isDemo ? 11 : 8 } }}>
        <Box sx={{ display: 'flex', width: '100%' }}>
          <CssBaseline />
          <Header showMenu usingSidebar />
          <Container
            maxWidth={false}
            sx={{
              px: 0,
              pt: 1,
              width: {
                lg: sidebarOpen ? `calc(100% - 254px)` : '100%',
              },
            }}
          >
            <Container
              maxWidth={false}
              sx={{
                minHeight: {
                  xs: `calc(100vh - ${data?.data?.isDemo ? '180px' : '120px'})`,
                  sm: `calc(100vh - ${data?.data?.isDemo ? '144px' : '120px'})`,
                },
                flexGrow: 1,
                py: 3,
                mb: 2,
                height: '100%',
                backgroundColor: colorTheme === 'dark' ? '#f4f4f426' : '#f4f4f4d6',
                borderRadius: '25px',
              }}
            >
              {children}
            </Container>
          </Container>
        </Box>
      </Grid>
    </LayoutWrapper>
  );
};

export default LayoutDefault;
