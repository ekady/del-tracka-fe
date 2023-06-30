// MUI Components
import { Grid, Container, Box, CssBaseline } from '@mui/material';

// Local Components
import { Header } from '@/common/base';
import LayoutWrapper from '../LayoutWrapper';

import { IPropsChildren } from '@/common/types';

import { useAppSelector } from '@/common/store';
import { selectColorTheme, selectSidebarOpen } from '@/common/store/selector';

const LayoutDefault = ({ children }: IPropsChildren) => {
  const sidebarOpen = useAppSelector(selectSidebarOpen);
  const colorTheme = useAppSelector(selectColorTheme);

  return (
    <LayoutWrapper>
      <Grid component="main" sx={{ flexGrow: 1, pt: 6 }}>
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
                minHeight: 'calc(100vh - 120px)',
                flexGrow: 1,
                mt: 2,
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
