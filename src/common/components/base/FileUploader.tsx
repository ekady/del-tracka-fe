// React
import { ChangeEvent, DragEvent, useRef, useState } from 'react';

// Next Component
import Image from 'next/image';

// MUI Components
import { Box, Button, IconButton, styled, Typography, useTheme } from '@mui/material';

// MUI Icons
import { Cancel } from '@mui/icons-material';

// Helper
import { formatBytes } from '@/common/helper';

type Indexable = {
  [key: string]: File;
};

const InputFile = styled('input')(() => ({
  display: 'none',
}));

const FilesUploadContainer = styled(Box)(() => ({
  component: 'div',
  border: '2px dashed',
  overflow: 'hidden',
  boxSizing: 'border-box',
}));

const FilesContainer = styled(Box)(() => ({
  height: '80%',
  width: '100%',
  overflow: 'auto',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'start',
  justifyContent: 'start',
}));

const ImageContainer = styled(Box)(() => ({
  position: 'relative',
  background: 'lightgray',
}));

const FileTextContainer = styled(Box)(() => ({
  marginTop: 5,
  overflowWrap: 'break-word',
  hyphens: 'auto',
}));

const ButtonContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
}));

const RemoveIconButton = styled(IconButton)(() => ({
  position: 'absolute',
  top: 2,
  right: 2,
  color: 'white',
  backgroundColor: '#00000057',
}));

const NextImage = styled(Image)(() => ({
  textAlign: 'center',
  lineHeight: 14,
  textTransform: 'uppercase',
  fontWeight: 'bold',
}));

export interface FileUploaderProps {
  multiple?: boolean;
  accept?: string[];
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
  disabled?: boolean;
}

const IMAGE_EXTENSION = ['.jpeg', '.jpg', '.JPG', '.PNG', '.png', '.GIF', '.gif'];
const DEFAULT_CONTAINER_HEIGHT = 500;
const DEFAULT_CONTAINER_WIDTH = '100%';
const DEFAULT_IMAGE_WIDTH = 200;
const DEFAULT_IMAGE_HEIGHT = 200;

export default function FileUploader({
  multiple,
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
}: FileUploaderProps) {
  const [files, setFiles] = useState<Indexable>({});
  const [isDrop, setIsDrop] = useState<boolean>(false);
  const inputField = useRef<HTMLInputElement>(null);
  const theme = useTheme();

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
      const filesContainer: Indexable = {};
      for (const file of Array.from(newFiles)) {
        if (!validateExtension(file.name)) continue;
        filesContainer[file.name] = file;
      }
      if (multiple) setFiles({ ...filesContainer, ...files });
      else {
        const arrayFilenames = Object.keys(filesContainer);
        if (arrayFilenames.length > 0) setFiles({ [arrayFilenames[0]]: filesContainer[arrayFilenames[0]] });
        else setFiles({ ...filesContainer });
      }
    }
  };

  const removeFile = (fileName: string) => {
    const filesCopy = Object.assign({}, files);
    delete filesCopy[fileName];
    setFiles(filesCopy);
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

  const buttonUpload = (
    <>
      <InputFile
        type="file"
        ref={inputField}
        onChange={onHandleFileUpload}
        multiple={multiple}
        accept={accept.join(', ').toString()}
      />
      <Button variant="contained" onClick={handleUploadButtonClick}>
        {buttonUploadText ? buttonUploadText : 'Upload File'}
      </Button>
    </>
  );

  const buttonUploadContainer = !disabled ? (
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
        width={widthContainer ?? DEFAULT_CONTAINER_WIDTH}
        height={heightContainer ?? DEFAULT_CONTAINER_HEIGHT}
        sx={{ padding: imageFullWidth ? 1 : 4 }}
      >
        {Object.keys(files).length ? (
          <>
            {!imageFullWidth && !disabled && <Box marginBottom={3}>{buttonUploadContainer}</Box>}
            <FilesContainer sx={{ overflow: imageFullWidth ? 'hidden' : 'auto', height: imageFullWidth ? '100%' : '80%' }}>
              {Object.keys(files).map((file) => (
                <Box key={file} margin={1} width={imageFullWidth ? '100%' : 'unset'} height={imageFullWidth ? '100%' : '80%'}>
                  <ImageContainer
                    sx={{
                      width: imageFullWidth ? '100%' : width ?? DEFAULT_IMAGE_WIDTH,
                      height: imageFullWidth ? '100%' : height ?? DEFAULT_IMAGE_HEIGHT,
                    }}
                  >
                    <NextImage
                      src={URL.createObjectURL(files[file])}
                      alt={getFileExtension(file)}
                      layout="fill"
                      objectFit="cover"
                    />
                    {!hideRemoveIcon && !disabled && (
                      <RemoveIconButton onClick={() => removeFile(file)}>
                        <Cancel />
                      </RemoveIconButton>
                    )}
                  </ImageContainer>
                  {!hideTextFile && (
                    <FileTextContainer width={imageFullWidth ? '100%' : width ?? DEFAULT_IMAGE_WIDTH}>
                      <Typography fontWeight="bold" fontSize={12}>
                        {file}
                      </Typography>
                      <Box height={5} />
                      <Typography fontSize={12}>{formatBytes(files[file].size)}</Typography>
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
      {buttonOutsideContainer && !disabled && (
        <ButtonContainer sx={{ height: 'unset', width: widthContainer ?? DEFAULT_CONTAINER_WIDTH, mt: 2 }}>
          {buttonUpload}
        </ButtonContainer>
      )}
    </>
  );
}
