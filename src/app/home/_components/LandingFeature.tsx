'use client';

import Image from 'next/image';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

import { IStaticImageData } from '@/app/_common/types';

export interface IFeatureText {
  title: string;
  subtitle: string;
}

export interface ILandingFeatureProps {
  icon: IStaticImageData;
  featureItems: IFeatureText[];
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
}

const LandingFeature = ({ featureItems, icon, direction }: ILandingFeatureProps) => {
  const theme = useTheme();
  const smAndUp = useMediaQuery(theme.breakpoints.up('sm'));
  const smAndDown = useMediaQuery(theme.breakpoints.down('sm'));

  const isRowReverse = direction === 'row-reverse';

  return (
    <Grid
      container
      spacing={2}
      direction={smAndDown ? 'column-reverse' : (direction ?? 'row')}
      alignItems="center"
      justifyContent="space-between"
      sx={{ my: 16 }}
    >
      <Grid item container xs={12} sm={6} direction="row" sx={{ mt: smAndUp ? 1 : 0 }}>
        <Grid item xs={isRowReverse || smAndUp ? 1 : 2} />
        <Grid item xs={10}>
          {featureItems.map((item) => (
            <Box key={item.title} sx={{ mb: 3 }}>
              <Typography component="h4" variant="h4" align="left" mb={2}>
                {item.title}
              </Typography>
              <Typography component="p" variant="subtitle2" fontSize={16} align="left" gutterBottom>
                {item.subtitle}
              </Typography>
            </Box>
          ))}
        </Grid>
        {(isRowReverse || smAndUp) && <Grid item xs={1} />}
      </Grid>
      <Grid item container xs={12} sm={6} direction="row" justifyContent={isRowReverse ? 'flex-start' : 'flex-end'}>
        <Grid item xs={12}>
          <Image
            src={icon}
            alt="illustration"
            width={400}
            height={400}
            style={{ objectFit: 'contain', width: '100%', height: 'auto' }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LandingFeature;
