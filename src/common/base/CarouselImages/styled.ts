// MUI Components
import { Box, IconButton, styled } from '@mui/material';

// Constant
import { CarouselSize } from './constants';

export const BoxArrow = styled(Box)(() => ({
  position: 'absolute',
  top: '0',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
}));

export const ButtonArrow = styled(IconButton)(() => ({
  background: 'white',
  border: '1px solid',
  '&:hover': {
    background: 'rgb(225, 224, 224)',
  },
}));

export const CircleIndicator = styled(Box)(() => ({
  display: 'inline-flex',
  borderRadius: '50%',
  borderWidth: 1,
  borderStyle: 'solid',
  height: CarouselSize.DefaultIndicatorHeightWidth,
  width: CarouselSize.DefaultIndicatorHeightWidth,
  marginLeft: 5,
  marginRight: 5,
}));
