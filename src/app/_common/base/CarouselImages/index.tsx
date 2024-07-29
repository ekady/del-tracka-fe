'use client';

// Next Components

// MUI Components

// MUI Icons
import Image from 'next/image';

import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import Box from '@mui/material/Box';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel as CarouselResponsive } from 'react-responsive-carousel';

// Local Components
import { CarouselSize } from '@/app/_common/base/CarouselImages/constants';
import { BoxArrow, ButtonArrow, CircleIndicator } from '@/app/_common/base/CarouselImages/styled';
import ImageLoader from '@/app/_common/base/ImageLoader';
import { IFileStream } from '@/app/_common/types';

export interface ICarouselImagesProps {
  images: IFileStream[] | string[];
  thumbSize?: number | string;
  imageHeight?: number | string;
  imageWidth?: number | string;
}

const CarouselImages = ({
  images,
  thumbSize = CarouselSize.DefaultThumbsWidth,
  imageHeight = CarouselSize.DefaultImageHeight,
  imageWidth = CarouselSize.DefaultImageWidth,
}: ICarouselImagesProps) => {
  return (
    <CarouselResponsive
      showStatus={false}
      infiniteLoop
      useKeyboardArrows
      swipeScrollTolerance={5}
      renderThumbs={() =>
        images.map((image) => (
          <Box
            key={typeof image !== 'string' ? image.completedPath : image}
            position="relative"
            height={thumbSize}
            width="100%"
          >
            {typeof image !== 'string' ? (
              <ImageLoader
                image={image}
                imageProps={{
                  alt: 'logo',
                  layout: 'fill',
                  objectFit: 'contain',
                }}
              />
            ) : (
              <Image src={image} layout="fill" objectFit="contain" alt="logo" />
            )}
          </Box>
        ))
      }
      renderArrowPrev={(clickHandler) => (
        <BoxArrow left={5} zIndex={1}>
          <ButtonArrow onClick={clickHandler}>
            <ChevronLeft sx={{ color: '#000' }} />
          </ButtonArrow>
        </BoxArrow>
      )}
      renderArrowNext={(clickHandler) => (
        <BoxArrow right={5}>
          <ButtonArrow onClick={clickHandler}>
            <ChevronRight sx={{ color: '#000' }} />
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
          key={typeof image !== 'string' ? image.completedPath : image}
          position="relative"
          height={imageHeight}
          width={imageWidth}
        >
          {typeof image !== 'string' ? (
            <ImageLoader
              image={image}
              imageProps={{
                alt: 'logo',
                layout: 'fill',
                objectFit: 'contain',
                loading: 'lazy',
              }}
            />
          ) : (
            <Image src={image} layout="fill" objectFit="contain" alt="logo" loading="lazy" />
          )}
        </Box>
      ))}
    </CarouselResponsive>
  );
};

export default CarouselImages;
