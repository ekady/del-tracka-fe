import { ChangeEvent, forwardRef, useMemo } from 'react';

import { Button } from '@mui/material';

import { IMAGE_EXTENSION } from '../constants';
import { InputFile } from '../styled';
import { FileUploaderProps } from '../interfaces';

interface ButtonUploadProps extends Pick<FileUploaderProps<File>, 'buttonUploadText' | 'accept' | 'InputProps'> {
  onChangeInput: (event: ChangeEvent<HTMLInputElement>) => void;
  onClickUpload: () => void;
  multiple?: boolean;
}
const ButtonUpload = forwardRef<HTMLInputElement, ButtonUploadProps>((props, ref) => {
  const { buttonUploadText, accept, InputProps, multiple, onChangeInput, onClickUpload } = props;
  const acceptFile = useMemo(() => {
    if (!accept) return IMAGE_EXTENSION;
    return accept;
  }, [accept]);

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
});
ButtonUpload.displayName = 'ButtonUpload';

export default ButtonUpload;
