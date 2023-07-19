// React
import { ReactNode, useCallback, DragEvent } from 'react';

// MUI Components
import { Box, Typography, useTheme } from '@mui/material';

// Local types
import { FunctionVoidWithParams, IFileStream } from '@/common/types';
import { FileUploaderProps } from './interfaces';

// Helper
import { ButtonContainer, FilesContainer, FilesUploadContainer } from './styled';
import { ButtonUpload, ErrorMessage, ImageView } from './components';

// Constants
import { FileUploaderEnum } from './constants';

// Hooks
import useFileUploaderEvent from './useFileUploaderEvent';
import useFileUploader from './useFileUploader';
import { toast } from 'react-toastify';

export interface FileUploaderMultipleProps extends FileUploaderProps<(File | IFileStream)[]> {
  maxImages?: number;
}

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
  maxImages,
  maxSizeKb,
}: FileUploaderMultipleProps) => {
  const { handleUploadButtonClick, inputFieldRef } = useFileUploader();
  const { isDrop, onHandleDragEnter, onHandleDragExit, onHandleFileDrop, onHandleFileUpload } = useFileUploaderEvent(
    Boolean(disabled),
  );
  const theme = useTheme();

  const addNewImages: FunctionVoidWithParams<FileList> = useCallback(
    (newFiles: FileList) => {
      if (maxImages && newFiles.length > maxImages) {
        toast.error(`Max images ${maxImages}`);
        return;
      }
      const arrayFiles = Array.from(newFiles);
      const invalidSize = maxSizeKb && arrayFiles.some((file) => file.size / 1024 > maxSizeKb);
      if (invalidSize) {
        toast.error(`Max size each images are ${maxSizeKb} Kb`);
        return;
      }

      const val = value ?? [];
      const files = [...val, ...arrayFiles];
      handleValue?.(files);
    },
    [handleValue, maxImages, maxSizeKb, value],
  );

  const removeImage: FunctionVoidWithParams<number> = useCallback(
    (index: number) => {
      const files = value?.filter((_file, i) => index !== i) ?? [];
      handleValue?.(files);
    },
    [handleValue, value],
  );

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
        bgcolor={isDrop ? theme.palette.success.main : theme.palette.background.default}
        borderColor={isDrop ? theme.palette.success.main : theme.palette.secondary.main}
        onDragOver={onHandleDragEnter}
        onDragLeave={onHandleDragExit}
        onDragEnter={onHandleDragEnter}
        onDrop={(e: DragEvent<HTMLDivElement>) => onHandleFileDrop(e, addNewImages)}
        width={widthContainer}
        height={heightContainer}
        sx={{ padding: 4 }}
      >
        {value?.length ? (
          <>
            {!disabled && (!maxImages || (!!maxImages && value.length < maxImages)) && (
              <Box marginBottom={3}>{buttonUpload}</Box>
            )}
            <FilesContainer
              sx={{ overflow: 'auto', height: disabled || (!!maxImages && value.length >= maxImages) ? '100%' : '80%' }}
            >
              {value.map((file, index) => (
                <Box
                  key={'name' in file ? file.name : file.filename}
                  margin={1}
                  height={disabled ? '100%' : '80%'}
                  position="relative"
                >
                  <ImageView
                    disabled={disabled}
                    value={file}
                    width={width}
                    height={height}
                    onClickRemove={() => removeImage(index)}
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
