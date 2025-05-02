import { Metadata } from 'next';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { LandingBanner, LandingCTA, LandingFeature, LandingChooseUs } from './_components';
import { FEATURE } from './_constant/landing';

export const metadata: Metadata = {
  title: 'Home',
};

const HomePage = () => {
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
            key={index}
            direction={index % 2 !== 1 ? 'row-reverse' : 'row'}
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

export default HomePage;
