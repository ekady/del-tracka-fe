import { RefObject, useRef } from 'react';
import { IMAGE_EXTENSION } from './constants';
import { getFileExtension } from './helper';

export type ReturnTypeFileUploaderEvent = {
  inputFieldRef: RefObject<HTMLInputElement>;
  handleUploadButtonClick: () => void;
  validateExtension: (filename: string) => boolean;
  getFileExtension: (filename: string) => string;
};

const useFileUploader = (acceptFiles?: string[]) => {
  const inputFieldRef = useRef<HTMLInputElement>(null);

  const validateExtension = (filename: string) => {
    const extension = getFileExtension(filename);
    const accept = acceptFiles && acceptFiles.length ? acceptFiles : IMAGE_EXTENSION;
    return accept.includes(`.${extension}`);
  };

  const handleUploadButtonClick = () => {
    if (inputFieldRef) {
      inputFieldRef.current?.click();
    }
  };

  return {
    inputFieldRef,
    handleUploadButtonClick,
    validateExtension,
    getFileExtension,
  };
};

export default useFileUploader;
