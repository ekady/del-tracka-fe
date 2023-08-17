// React
import type { ReactElement } from 'react';

// MUI
// Components
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

// MUI utils
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// Components
import { LayoutHome } from '@/common/layout';
import { LandingBanner, LandingCTA, LandingFeature, LandingChooseUs } from '@/features/home/components';

// Constant
import { FEATURE } from '@/features/home/constant/landing';

const Home = () => {
  const theme = useTheme();
  const smAndUp = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Box>
      <Container>
        <LandingBanner />

        <Box height={200} />

        <Typography component="h1" textAlign="center" fontSize={36} fontWeight="bold" mb={-5}>
          OUR FEATURE
        </Typography>
        {FEATURE.map((feature, index) => (
          <LandingFeature
            key={feature.items.toString()}
            direction={smAndUp ? (index % 2 !== 1 ? 'row-reverse' : 'row') : 'column-reverse'}
            featureItems={feature.items}
            icon={feature.icon}
          />
        ))}

        <Box height={200} />

        <LandingChooseUs />

        <Box height={200} />
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
