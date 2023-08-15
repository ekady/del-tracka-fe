// React
import { DragEvent, ReactNode, useCallback } from 'react';

// MUI Components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { useTheme } from '@mui/material/styles';

// Local types
import { FunctionVoid, FunctionVoidWithParams, IFileStream } from '@/common/types';
import { FileUploaderProps } from './interfaces';

// Toastify
import { toast } from 'react-toastify';

// Helper
import { ButtonContainer, FilesContainer, FilesUploadContainer } from './styled';
import { ButtonUpload, ErrorMessage, ImageView } from './components';

// Constants
import { FileUploaderEnum } from './constants';

// Hooks
import useFileUploaderEvent from './useFileUploaderEvent';
import useFileUploader from './useFileUploader';

export interface FileUploaderSingleProps extends FileUploaderProps<File | IFileStream | string> {}

const FileUploaderSingle = ({
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
  hideRemoveIcon,
  maxSizeKb,
}: FileUploaderSingleProps) => {
  const { handleUploadButtonClick, inputFieldRef } = useFileUploader();
  const { isDrop, onHandleDragEnter, onHandleDragExit, onHandleFileDrop, onHandleFileUpload } = useFileUploaderEvent(
    Boolean(disabled),
  );
  const theme = useTheme();

  const changeImage: FunctionVoidWithParams<FileList> = useCallback(
    (newFiles: FileList) => {
      const file = newFiles[0];

      if (maxSizeKb && file.size / 1024 > maxSizeKb) {
        toast.error(`Max size of image is ${maxSizeKb} Kb`);
        return;
      }

      handleValue?.(file);
    },
    [handleValue, maxSizeKb],
  );

  const removeImage: FunctionVoid = useCallback(() => {
    handleValue?.(null);
  }, [handleValue]);

  const textHelper: ReactNode = (
    <Box textAlign="center" display="flex" alignItems="center" height="100%">
      <Typography component="p">{disabled ? 'No File' : description}</Typography>
    </Box>
  );

  return (
    <>
      <FilesUploadContainer
        bgcolor={isDrop ? theme.palette.success.main : theme.palette.background.default}
        borderColor={isDrop ? theme.palette.success.main : theme.palette.secondary.main}
        onDragOver={onHandleDragEnter}
        onDragLeave={onHandleDragExit}
        onDragEnter={onHandleDragEnter}
        onDrop={(e: DragEvent<HTMLDivElement>) => onHandleFileDrop(e, changeImage)}
        width={widthContainer}
        height={heightContainer}
        sx={{ padding: 1 }}
      >
        {value ? (
          <>
            <FilesContainer sx={{ overflow: 'hidden', height: '100%' }}>
              <Box width="100%" height="100%" position="relative">
                <ImageView
                  disabled={disabled}
                  value={value}
                  width={width}
                  height={height}
                  onClickRemove={removeImage}
                  hideTextFile={hideTextFile}
                  hideRemoveIcon={hideRemoveIcon}
                />
              </Box>
            </FilesContainer>
          </>
        ) : (
          textHelper
        )}
      </FilesUploadContainer>
      <ErrorMessage width={widthContainer} error={error} />
      {!disabled && (
        <ButtonContainer sx={{ height: 'unset', width: widthContainer, mt: 2 }}>
          <ButtonUpload
            onClickUpload={handleUploadButtonClick}
            onChangeInput={(e) => onHandleFileUpload(e, changeImage)}
            ref={inputFieldRef}
            accept={accept}
            buttonUploadText={buttonUploadText}
            InputProps={InputProps}
          />
        </ButtonContainer>
      )}
    </>
  );
};

export default FileUploaderSingle;
