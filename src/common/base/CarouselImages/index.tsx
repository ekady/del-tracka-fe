// Next Components
import Image from 'next/image';

// MUI Components
import { Box } from '@mui/material';

// MUI Icons
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

// React Carousel
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel as CarouselResponsive } from 'react-responsive-carousel';

// Local Components
import { BoxArrow, ButtonArrow, CircleIndicator } from './styled';

// Constants
import { CarouselSize } from './constants';
import { Thumbnail } from '../FileUploader/interfaces';

export interface CarouselImagesProps {
  images: Thumbnail[];
  thumbsHeight?: number | string;
  thumbsWidth?: number | string;
  imageHeight?: number | string;
  imageWidth?: number | string;
}

const CarouselImages = ({
  images,
  thumbsHeight = CarouselSize.DefaultThumbsHeight,
  thumbsWidth = CarouselSize.DefaultThumbsWidth,
  imageHeight = CarouselSize.DefaultImageHeight,
  imageWidth = CarouselSize.DefaultImageWidth,
}: CarouselImagesProps) => {
  return (
    <CarouselResponsive
      showStatus={false}
      infiniteLoop
      useKeyboardArrows
      swipeScrollTolerance={5}
      renderThumbs={() =>
        images.map((image) => (
          <Box key={image.src} position="relative" height={thumbsHeight} width={thumbsWidth}>
            <Image src={image.src} layout="fill" objectFit="contain" alt="logo" />
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
        <Box key={image.src} position="relative" height={imageHeight} width={imageWidth}>
          <Image alt="image" src={image.src} layout="fill" objectFit="contain" loading="lazy" />
        </Box>
      ))}
    </CarouselResponsive>
  );
};

export default CarouselImages;
