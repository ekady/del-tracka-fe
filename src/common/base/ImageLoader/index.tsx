import Image, { ImageProps } from 'next/image';

import { skipToken } from '@reduxjs/toolkit/dist/query';

import { Box, CircularProgress, IconButton } from '@mui/material';
import { BrokenImage, Replay } from '@mui/icons-material';

import { useGetFileQuery } from '@/features/file-stream/store/file-stream.api.slice';
import { IFileStream } from '@/common/types';

export interface ImageLoaderProps {
  image: IFileStream;
  loaderSize?: number;
  brokenSize?: number;
  imageProps?: Omit<ImageProps, 'src'>;
  disabledReload?: boolean;
}

const ImageLoader = ({ image, loaderSize, imageProps, brokenSize, disabledReload }: ImageLoaderProps) => {
  const { data, isError, isLoading, isFetching, refetch } = useGetFileQuery(image.completedPath ?? skipToken);

  if (isFetching || isLoading) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        border="1px solid #ccc"
        borderRadius="8px"
        height={imageProps?.height ?? '100%'}
        width={imageProps?.width ?? '100%'}
        boxSizing="border-box"
        padding="4px"
      >
        <CircularProgress size={loaderSize} />
      </Box>
    );
  }

  if ((isError || !data) && disabledReload) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" height="100%" width="100%">
        <BrokenImage style={{ height: brokenSize, width: brokenSize }} />
      </Box>
    );
  }

  if (isError || !data) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        border="1px solid #ccc"
        borderRadius="8px"
        height={imageProps?.height ?? '100%'}
        width={imageProps?.width ?? '100%'}
        boxSizing="border-box"
        padding="4px"
      >
        <IconButton aria-label="reload" onClick={refetch}>
          <Replay />
        </IconButton>
      </Box>
    );
  }

  return <Image src={data} alt="image" {...imageProps} />;
};

export default ImageLoader;
