// Components
import { Box, Container } from '@mui/material';
import { LandingBanner, LandingFeature, LandingImages, LandingCTA } from './components';

// Utils
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// Constant
import { feature } from '../constant/landing';

export default function LandingUI() {
  const theme = useTheme();
  const smAndUp = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Box>
      <Container maxWidth="xl">
        <LandingBanner />
        <LandingFeature
          direction={smAndUp ? 'row-reverse' : 'column-reverse'}
          featureItems={feature.feature1.items}
          icon={feature.feature1.icon}
        />
        <LandingFeature
          direction={smAndUp ? 'row' : 'column-reverse'}
          featureItems={feature.feature2.items}
          icon={feature.feature2.icon}
        />
        <LandingImages />
      </Container>
      <Container maxWidth={false} disableGutters>
        <LandingCTA />
      </Container>
    </Box>
  );
}
