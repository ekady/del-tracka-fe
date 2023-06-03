import { RefObject, useCallback, useRef } from 'react';

import { FunctionVoid } from '@/common/types';
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

  const validateExtension = useCallback(
    (filename: string): boolean => {
      const extension = getFileExtension(filename);
      const accept = acceptFiles?.length ? acceptFiles : IMAGE_EXTENSION;
      return accept.includes(`.${extension}`);
    },
    [acceptFiles],
  );

  const handleUploadButtonClick: FunctionVoid = useCallback(() => {
    if (inputFieldRef) {
      inputFieldRef.current?.click();
    }
  }, []);

  return {
    inputFieldRef,
    handleUploadButtonClick,
    validateExtension,
    getFileExtension,
  };
};

export default useFileUploader;
