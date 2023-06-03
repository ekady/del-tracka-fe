import Image from 'next/image';
import { Box, Typography } from '@mui/material';
import { Cancel } from '@mui/icons-material';

import { FunctionVoidWithParams } from '@/common/types';
import { formatBytes } from '@/common/helper';
import { extractSrcThumbnailFile, getFileExtension } from '../helper';
import { FileTextContainer, ImageContainer, RemoveIconButton } from '../styled';
import { FileUploaderProps, Thumbnail } from '../interfaces';

interface ImageViewProps
  extends Pick<FileUploaderProps<File | Thumbnail>, 'width' | 'height' | 'disabled' | 'hideTextFile'> {
  value: File | Thumbnail;
  onClickRemove?: FunctionVoidWithParams<string>;
  hideRemoveIcon?: boolean;
}
const ImageView = ({ width, height, value, disabled, onClickRemove, hideTextFile, hideRemoveIcon }: ImageViewProps) => {
  return (
    <>
      <ImageContainer sx={{ position: 'relative', width, height }}>
        <Image
          src={extractSrcThumbnailFile(value)}
          alt={getFileExtension(value.name)}
          width={200}
          height={200}
          style={{ objectFit: 'cover', width: width, height: height }}
        />
      </ImageContainer>
      {!disabled && !hideRemoveIcon && (
        <RemoveIconButton onClick={() => onClickRemove?.(value.name)}>
          <Cancel />
        </RemoveIconButton>
      )}
      {!hideTextFile && (
        <FileTextContainer width={width}>
          <Typography fontWeight="bold" fontSize={12}>
            {value.name}
          </Typography>
          <Box height={5} />
          <Typography fontSize={12}>{formatBytes(Number(value.size))}</Typography>
        </FileTextContainer>
      )}
    </>
  );
};

export default ImageView;
