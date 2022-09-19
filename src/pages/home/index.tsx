// React
import type { ReactElement } from 'react';

// MUI
import { Box, Container, useMediaQuery, useTheme } from '@mui/material';

// Components
import { LayoutHome } from '@/common/layout';
import { LandingBanner, LandingCTA, LandingFeature, LandingImages } from '@/features/Landing/components';

// Constant
import { FEATURE } from '@/features/Landing/constant/landing';

const Home = () => {
  const theme = useTheme();
  const smAndUp = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Box>
      <Container maxWidth={false}>
        <LandingBanner />
        <LandingFeature
          direction={smAndUp ? 'row-reverse' : 'column-reverse'}
          featureItems={FEATURE.feature1.items}
          icon={FEATURE.feature1.icon}
        />
        <LandingFeature
          direction={smAndUp ? 'row' : 'column-reverse'}
          featureItems={FEATURE.feature2.items}
          icon={FEATURE.feature2.icon}
        />
        <LandingImages />
      </Container>
      <Container maxWidth={false} disableGutters>
        <LandingCTA />
      </Container>
    </Box>
  );
};

Home.getLayout = (page: ReactElement) => {
  return <LayoutHome>{page}</LayoutHome>;
};

export default Home;
