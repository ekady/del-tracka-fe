import Image from 'next/image';

import Cancel from '@mui/icons-material/Cancel';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import ImageLoader from '@/app/_common/base/ImageLoader';
import { formatBytes } from '@/app/_common/helper';
import { convertFileToUrl } from '@/app/_common/helper/convert.helper';
import { IFileStream, TFunctionVoidWithParams } from '@/app/_common/types';

import { getFileExtension } from '../helper';
import { IFileUploaderProps } from '../interfaces';
import { FileTextContainer, ImageContainer, RemoveIconButton } from '../styled';

interface IImageViewProps
  extends Pick<IFileUploaderProps<File | IFileStream>, 'width' | 'height' | 'disabled' | 'hideTextFile'> {
  value: File | IFileStream | string;
  onClickRemove?: TFunctionVoidWithParams<string>;
  hideRemoveIcon?: boolean;
}
const ImageView = ({
  width,
  height,
  value,
  disabled,
  onClickRemove,
  hideTextFile,
  hideRemoveIcon,
}: IImageViewProps) => {
  const isStream = typeof value !== 'string' && 'completedPath' in value;
  const isString = typeof value === 'string';
  return (
    <>
      <ImageContainer sx={{ position: 'relative', width, height }}>
        {isStream ? (
          <ImageLoader
            image={value}
            brokenSize={60}
            imageProps={{
              alt: getFileExtension(value.filename),
              height: 180,
              width: 180,
              style: { objectFit: 'cover', width: width, height: height },
            }}
          />
        ) : (
          <Image
            src={value instanceof File ? convertFileToUrl(value) : value}
            alt={isString ? value : getFileExtension(value.name)}
            width={200}
            height={200}
            style={{ objectFit: 'cover', width: width, height: height }}
          />
        )}
      </ImageContainer>
      {!disabled && !hideRemoveIcon && !isString && (
        <RemoveIconButton onClick={() => onClickRemove?.(isStream ? value.filename : value.name)}>
          <Cancel />
        </RemoveIconButton>
      )}
      {!hideTextFile && !isString && (
        <FileTextContainer width={width}>
          <Typography fontWeight="bold" fontSize={12}>
            {isStream ? value.filename : value.name}
          </Typography>
          <Box height={5} />
          <Typography fontSize={12}>{formatBytes(Number(isStream ? value.fileSize : value.size))}</Typography>
        </FileTextContainer>
      )}
    </>
  );
};

export default ImageView;
