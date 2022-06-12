// React
import { ChangeEvent, DetailedHTMLProps, DragEvent, InputHTMLAttributes, ReactNode, useMemo, useRef, useState } from 'react';

// Next
import Image from 'next/image';

// MUI Components
import { Box, Button, Typography, useTheme } from '@mui/material';

// MUI Icons
import { Cancel } from '@mui/icons-material';

// Local types
import { FunctionVoidWithParams, Indexable } from '@/types';

// Helper
import { formatBytes, extractErrorMessage } from '@/common/helper';
import {
  ButtonContainer,
  FilesContainer,
  FilesUploadContainer,
  FileTextContainer,
  ImageContainer,
  InputFile,
  RemoveIconButton,
} from './styled';

// Constants
import { FileUploaderSize, IMAGE_EXTENSION } from './constants';

import { FieldError } from 'react-hook-form';

export type Thumbnail = {
  src: string;
  size: string | number;
  filename: string;
};
export const extractSrcThumbnailFile = (x: Thumbnail | File): string => {
  if ('src' in x) return x.src;
  return URL.createObjectURL(x);
};

export type FileIndexable = Indexable<string, File | Thumbnail>;

export type FileUploaderProps = {
  multiple?: boolean;
  value?: FileIndexable | null | undefined;
  handleValue?: FunctionVoidWithParams<FileIndexable>;
  accept?: readonly string[];
  buttonUploadText?: string;
  description?: string;
  hideDescription?: boolean;
  buttonOutsideContainer?: boolean;
  hideRemoveIcon?: boolean;
  hideTextFile?: boolean;
  imageFullWidth?: boolean;
  widthContainer?: number | string;
  heightContainer?: number | string;
  width?: number | string;
  height?: number | string;
  error?: FieldError;
  disabled?: boolean;
  InputProps?: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
};

const FileUploader = ({
  multiple,
  value,
  handleValue,
  accept = IMAGE_EXTENSION,
  buttonUploadText,
  description,
  hideDescription,
  hideRemoveIcon,
  hideTextFile,
  buttonOutsideContainer,
  imageFullWidth,
  widthContainer,
  heightContainer,
  width,
  height,
  disabled,
  error,
  InputProps,
}: FileUploaderProps) => {
  const [isDrop, setIsDrop] = useState<boolean>(false);
  const inputField = useRef<HTMLInputElement>(null);
  const [containError, errorMessage] = extractErrorMessage(error, 'Image', '');
  const theme = useTheme();

  const sizes = useMemo(
    () => ({
      image: { width: width ?? FileUploaderSize.DefaultImageWidth, height: height ?? FileUploaderSize.DefaultImageHeight },
      container: {
        width: widthContainer ?? FileUploaderSize.DefaultContainerWidth,
        height: heightContainer ?? FileUploaderSize.DefaultContainerHeight,
      },
    }),
    [height, heightContainer, width, widthContainer],
  );

  const getFileExtension = (filename: string) => {
    return filename.substring(filename.lastIndexOf('.') + 1, filename.length) || filename;
  };

  const validateExtension = (filename: string) => {
    const extension = getFileExtension(filename);
    const acceptFiles = accept && accept.length ? accept : IMAGE_EXTENSION;
    return acceptFiles.includes(`.${extension}`);
  };

  const addNewFiles = (newFiles: FileList) => {
    if (newFiles && newFiles.length) {
      const filesContainer: FileIndexable = {};
      for (const file of Array.from(newFiles)) {
        if (!validateExtension(file.name)) continue;
        filesContainer[file.name] = file;
      }
      if (multiple) handleValue && handleValue({ ...filesContainer, ...value });
      else {
        const arrayFilenames = Object.keys(filesContainer);
        if (arrayFilenames.length > 0) handleValue && handleValue({ [arrayFilenames[0]]: filesContainer[arrayFilenames[0]] });
        else handleValue && handleValue({ ...filesContainer });
      }
    }
  };

  const removeFile = (fileName: string) => {
    const filesCopy = Object.assign({}, value);
    delete filesCopy[fileName];
    handleValue && handleValue(filesCopy);
  };

  const handleUploadButtonClick = () => {
    if (inputField) {
      inputField.current?.click();
    }
  };

  const onHandleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    if (disabled) return;
    e.preventDefault();
    setIsDrop(true);
  };

  const onHandleDragExit = (e: DragEvent<HTMLDivElement>) => {
    if (disabled) return;
    e.preventDefault();
    setIsDrop(false);
  };

  const onHandleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    e.preventDefault();
    const { files } = e.target;
    files && addNewFiles(files);
  };

  const onHandleFileDrop = (e: DragEvent<HTMLDivElement>) => {
    if (disabled) return;
    e.preventDefault();
    const { files } = e.dataTransfer;
    files && addNewFiles(files);
    setIsDrop(false);
  };

  const buttonUpload: ReactNode = (
    <>
      <InputFile
        type="file"
        ref={inputField}
        onChange={onHandleFileUpload}
        multiple={multiple}
        accept={accept.join(', ').toString()}
        {...InputProps}
      />
      <Button variant="contained" onClick={handleUploadButtonClick}>
        {buttonUploadText ? buttonUploadText : 'Upload File'}
      </Button>
    </>
  );

  const buttonUploadContainer: ReactNode = !disabled ? (
    <Box textAlign="center">
      {!buttonOutsideContainer && buttonUpload}
      {!hideDescription && (
        <Typography component="p">{description ? description : 'Drop files here or click Upload File'}</Typography>
      )}
    </Box>
  ) : (
    <Typography component="p">No File</Typography>
  );

  return (
    <>
      <FilesUploadContainer
        bgcolor={isDrop ? '#cbfff0' : 'white'}
        borderColor={isDrop ? theme.palette.success.main : theme.palette.secondary.main}
        onDragOver={onHandleDragEnter}
        onDragLeave={onHandleDragExit}
        onDragEnter={onHandleDragEnter}
        onDrop={onHandleFileDrop}
        width={sizes.container.width}
        height={sizes.container.height}
        sx={{ padding: imageFullWidth ? 1 : 4 }}
      >
        {value && Object.keys(value).length ? (
          <>
            {!imageFullWidth && !disabled && <Box marginBottom={3}>{buttonUploadContainer}</Box>}
            <FilesContainer sx={{ overflow: imageFullWidth ? 'hidden' : 'auto', height: imageFullWidth ? '100%' : '80%' }}>
              {Object.keys(value).map((file) => (
                <Box
                  key={file}
                  margin={1}
                  width={imageFullWidth ? '100%' : 'unset'}
                  height={imageFullWidth ? '100%' : '80%'}
                  position="relative"
                >
                  <ImageContainer
                    sx={{
                      position: 'relative',
                      width: imageFullWidth ? '100%' : sizes.image.width,
                      height: imageFullWidth ? '100%' : sizes.image.height,
                    }}
                  >
                    <Image
                      src={extractSrcThumbnailFile(value[file])}
                      alt={getFileExtension(file)}
                      layout="fill"
                      objectFit="cover"
                    />
                  </ImageContainer>
                  {!hideRemoveIcon && !disabled && (
                    <RemoveIconButton onClick={() => removeFile(file)}>
                      <Cancel />
                    </RemoveIconButton>
                  )}
                  {!hideTextFile && (
                    <FileTextContainer width={imageFullWidth ? '100%' : sizes.image.width}>
                      <Typography fontWeight="bold" fontSize={12}>
                        {file}
                      </Typography>
                      <Box height={5} />
                      <Typography fontSize={12}>{formatBytes(Number(value[file].size))}</Typography>
                    </FileTextContainer>
                  )}
                </Box>
              ))}
            </FilesContainer>
          </>
        ) : (
          <ButtonContainer>{buttonUploadContainer}</ButtonContainer>
        )}
      </FilesUploadContainer>
      {containError && (
        <Typography width={sizes.container.width} color="red" align="center" fontSize="0.75rem">
          {errorMessage}
        </Typography>
      )}
      {buttonOutsideContainer && !disabled && (
        <ButtonContainer sx={{ height: 'unset', width: sizes.container.width, mt: 2 }}>{buttonUpload}</ButtonContainer>
      )}
    </>
  );
};

export default FileUploader;
