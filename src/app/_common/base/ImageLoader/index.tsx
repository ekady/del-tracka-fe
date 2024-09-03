'use client';

import { useState } from 'react';

import Image, { ImageProps } from 'next/image';

import BrokenImage from '@mui/icons-material/BrokenImage';
import Box from '@mui/material/Box';

import { IFileStream } from '@/app/_common/types';

export interface ImageLoaderProps {
  image: IFileStream;
  brokenSize?: number;
  imageProps?: Omit<ImageProps, 'src'>;
}

const ImageLoader = ({ image, imageProps, brokenSize }: ImageLoaderProps) => {
  const [isError, setIsError] = useState(false);

  if (isError || !image) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" height="100%" width="100%">
        <BrokenImage style={{ height: brokenSize, width: brokenSize }} />
      </Box>
    );
  }

  return (
    <Image
      src={'completedPath' in image ? `/api/file-stream?key=${image.completedPath}` : image}
      alt="image"
      onError={() => setIsError(true)}
      priority
      {...imageProps}
    />
  );
};

export default ImageLoader;
