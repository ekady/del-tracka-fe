import { ChangeEvent, RefObject } from 'react';

import Button from '@mui/material/Button';

import { IMAGE_EXTENSION } from '../constants';
import { IFileUploaderProps } from '../interfaces';
import { InputFile } from '../styled';

interface IButtonUploadProps extends Pick<IFileUploaderProps<File>, 'buttonUploadText' | 'accept' | 'InputProps'> {
  onChangeInput: (event: ChangeEvent<HTMLInputElement>) => void;
  onClickUpload: () => void;
  multiple?: boolean;
  ref?: RefObject<HTMLInputElement | null>;
}
const ButtonUpload = ({
  buttonUploadText,
  accept,
  InputProps,
  multiple,
  onChangeInput,
  onClickUpload,
  ref,
}: IButtonUploadProps) => {
  const acceptFile = accept ?? IMAGE_EXTENSION;

  return (
    <>
      <InputFile
        type="file"
        ref={ref}
        onChange={onChangeInput}
        multiple={multiple}
        accept={acceptFile.join(', ').toString()}
        {...InputProps}
      />
      <Button variant="contained" onClick={onClickUpload}>
        {buttonUploadText ? buttonUploadText : 'Upload File'}
      </Button>
    </>
  );
};

export default ButtonUpload;
