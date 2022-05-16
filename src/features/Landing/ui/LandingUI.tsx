// Components
import { Box, Container } from '@mui/material';
import { LandingBanner, LandingFeature, LandingImages, LandingCTA } from './components';

// Utils
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// Constant
import { FEATURE } from '../constant/landing';

const LandingUI = () => {
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

export default LandingUI;
