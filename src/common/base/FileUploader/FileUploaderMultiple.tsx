// React
import { ReactNode } from 'react';

// MUI Components
import { Box, Typography, useTheme } from '@mui/material';

// Local types
import { FunctionVoidWithParams } from '@/common/types';
import { FileUploaderProps, Thumbnail } from './types';

// Helper
import { ButtonContainer, FilesContainer, FilesUploadContainer } from './styled';
import { ButtonUpload, ErrorMessage, ImageView } from './components';

// Constants
import { FileUploaderEnum } from './constants';

// Hooks
import useFileUploaderEvent from './useFileUploaderEvent';
import useFileUploader from './useFileUploader';

export type FileUploaderMultipleProps = FileUploaderProps<(File | Thumbnail)[]>;
const FileUploaderMultiple = ({
  value,
  handleValue,
  accept,
  buttonUploadText = FileUploaderEnum.DefaultButtonUploadText,
  description = FileUploaderEnum.DefaultUploadDescriptionText,
  hideTextFile,
  widthContainer = FileUploaderEnum.DefaultContainerWidth,
  heightContainer = FileUploaderEnum.DefaultContainerHeight,
  width = FileUploaderEnum.DefaultImageWidth,
  height = FileUploaderEnum.DefaultImageWidth,
  disabled,
  error,
  InputProps,
}: FileUploaderMultipleProps) => {
  const { handleUploadButtonClick, inputFieldRef } = useFileUploader();
  const { isDrop, onHandleDragEnter, onHandleDragExit, onHandleFileDrop, onHandleFileUpload } = useFileUploaderEvent(
    Boolean(disabled),
  );
  const theme = useTheme();

  const addNewImages: FunctionVoidWithParams<FileList> = (newFiles: FileList) => {
    const val = value ?? [];
    const files = [...val, ...Array.from(newFiles)];
    handleValue && handleValue(files);
  };

  const removeImage = (fileName: string) => {
    const files = value?.filter((file) => file.name !== fileName) ?? [];
    handleValue && handleValue(files);
  };

  const buttonUpload: ReactNode = !disabled ? (
    <Box textAlign="center">
      <ButtonUpload
        onClickUpload={handleUploadButtonClick}
        onChangeInput={(e) => onHandleFileUpload(e, addNewImages)}
        ref={inputFieldRef}
        accept={accept}
        buttonUploadText={buttonUploadText}
        InputProps={InputProps}
        multiple
      />
      <Typography component="p">{description ?? 'Drop files here or click Upload File'}</Typography>
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
        onDrop={(e) => onHandleFileDrop(e, addNewImages)}
        width={widthContainer}
        height={heightContainer}
        sx={{ padding: 4 }}
      >
        {value && value.length ? (
          <>
            {!disabled && <Box marginBottom={3}>{buttonUpload}</Box>}
            <FilesContainer sx={{ overflow: 'auto', height: disabled ? '100%' : '80%' }}>
              {value.map((file, index) => (
                <Box key={`${file.name}-${index}`} margin={1} height={disabled ? '100%' : '80%'} position="relative">
                  <ImageView
                    disabled={disabled}
                    value={file}
                    width={width}
                    height={height}
                    onClickRemove={removeImage}
                    hideTextFile={hideTextFile}
                  />
                </Box>
              ))}
            </FilesContainer>
          </>
        ) : (
          <ButtonContainer>{buttonUpload}</ButtonContainer>
        )}
      </FilesUploadContainer>
      <ErrorMessage width={widthContainer} error={error} />
    </>
  );
};

export default FileUploaderMultiple;
