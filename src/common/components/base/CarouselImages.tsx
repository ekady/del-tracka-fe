// Next Components
import Image from 'next/image';

// MUI Components
import { Box, IconButton, styled } from '@mui/material';

// MUI Icons
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

// React Carousel
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel as CarouselResponsive } from 'react-responsive-carousel';

const DEFAULT_IMAGE_WIDTH = '100%';
const DEFAULT_IMAGE_HEIGHT = 500;
const DEFAULT_THUMBS_WIDTH = 80;
const DEFAULT_THUMBS_HEIGHT = 80;
const DEFAULT_INDICATOR_HEIGHT_WIDTH = 15;

const BoxArrow = styled(Box)(() => ({
  position: 'absolute',
  top: '0',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
}));

const ButtonArrow = styled(IconButton)(() => ({
  background: 'white',
  border: '1px solid',
  '&:hover': {
    background: 'rgb(225, 224, 224)',
  },
}));

const CircleIndicator = styled(Box)(() => ({
  display: 'inline-flex',
  borderRadius: '50%',
  borderWidth: 1,
  borderStyle: 'solid',
  height: DEFAULT_INDICATOR_HEIGHT_WIDTH,
  width: DEFAULT_INDICATOR_HEIGHT_WIDTH,
  marginLeft: 5,
  marginRight: 5,
}));

export interface CarouselImagesProps {
  images: string[];
  thumbsHeight?: number | string;
  thumbsWidth?: number | string;
  imageHeight?: number | string;
  imageWidth?: number | string;
}

export default function CarouselImages({ images, thumbsHeight, thumbsWidth, imageHeight, imageWidth }: CarouselImagesProps) {
  return (
    <CarouselResponsive
      showStatus={false}
      infiniteLoop
      useKeyboardArrows
      swipeScrollTolerance={5}
      renderThumbs={() =>
        images.map((image) => (
          <Box
            key={image}
            position="relative"
            height={thumbsHeight ?? DEFAULT_THUMBS_HEIGHT}
            width={thumbsWidth ?? DEFAULT_THUMBS_WIDTH}
          >
            <Image src={image} layout="fill" objectFit="contain" alt="logo" />
          </Box>
        ))
      }
      renderArrowPrev={(clickHandler) => (
        <BoxArrow left={5} zIndex={1}>
          <ButtonArrow onClick={clickHandler}>
            <ChevronLeft />
          </ButtonArrow>
        </BoxArrow>
      )}
      renderArrowNext={(clickHandler) => (
        <BoxArrow right={5}>
          <ButtonArrow onClick={clickHandler}>
            <ChevronRight />
          </ButtonArrow>
        </BoxArrow>
      )}
      renderIndicator={(clickHandler, isSelected) => (
        <CircleIndicator
          onClick={clickHandler}
          bgcolor={isSelected ? 'white' : 'gray'}
          borderColor={isSelected ? 'gray' : 'white'}
        />
      )}
    >
      {images.map((image) => (
        <Box
          key={image}
          position="relative"
          height={imageHeight ?? DEFAULT_IMAGE_HEIGHT}
          width={imageWidth ?? DEFAULT_IMAGE_WIDTH}
        >
          <Image alt="image" src={image} layout="fill" objectFit="contain" loading="lazy" />
        </Box>
      ))}
    </CarouselResponsive>
  );
}
