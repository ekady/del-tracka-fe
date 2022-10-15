// MUI Components
import { Grid, Container, Box, CssBaseline } from '@mui/material';

// Utils
import { useTheme, ThemeProvider } from '@mui/material/styles';

// Local Components
import { Header } from '@/common/base';

import { IPropsChildren } from '@/common/types';

const LayoutDefault = ({ children }: IPropsChildren) => {
  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <Grid component="main" sx={{ flexGrow: 1, pt: 6 }}>
        <Box sx={{ display: 'flex', width: '100%' }}>
          <CssBaseline />
          <Header showMenu usingSidebar />
          <Container maxWidth={false} sx={{ px: 0, pt: 1 }}>
            <Container
              maxWidth={false}
              sx={{
                minHeight: '80vh',
                flexGrow: 1,
                mt: 2,
                py: 3,
                mb: 2,
                height: '100%',
                backgroundColor: '#f4f4f4d6',
                borderRadius: '25px',
              }}
            >
              {children}
            </Container>
          </Container>
        </Box>
      </Grid>
    </ThemeProvider>
  );
};

export default LayoutDefault;
