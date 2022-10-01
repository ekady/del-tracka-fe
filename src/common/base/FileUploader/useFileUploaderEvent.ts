import { ChangeEvent, DragEvent, useCallback, useState } from 'react';

import { FunctionVoidWithParams } from '@/common/types';

export type ReturnTypeFileUploaderEvent = {
  isDrop: boolean;
  onHandleDragEnter: (e: DragEvent<HTMLDivElement>) => void;
  onHandleDragExit: (e: DragEvent<HTMLDivElement>) => void;
  onHandleFileUpload: (e: ChangeEvent<HTMLInputElement>, callback?: FunctionVoidWithParams<FileList>) => void;
  onHandleFileDrop: (e: DragEvent<HTMLDivElement>, callback?: FunctionVoidWithParams<FileList>) => void;
};

const useFileUploaderEvent = (disabled: boolean): ReturnTypeFileUploaderEvent => {
  const [isDrop, setIsDrop] = useState<boolean>(false);

  const onHandleDragEnter = useCallback(
    (e: DragEvent<HTMLDivElement>): void => {
      if (disabled) return;
      e.preventDefault();
      setIsDrop(true);
    },
    [disabled],
  );

  const onHandleDragExit = useCallback(
    (e: DragEvent<HTMLDivElement>): void => {
      if (disabled) return;
      e.preventDefault();
      setIsDrop(false);
    },
    [disabled],
  );

  const onHandleFileUpload = useCallback(
    (e: ChangeEvent<HTMLInputElement>, callback?: FunctionVoidWithParams<FileList>): void => {
      if (disabled) return;
      e.preventDefault();
      if (callback && e.target.files) callback(e.target.files);
    },
    [disabled],
  );

  const onHandleFileDrop = useCallback(
    (e: DragEvent<HTMLDivElement>, callback?: FunctionVoidWithParams<FileList>): void => {
      if (disabled) return;
      e.preventDefault();
      setIsDrop(false);
      if (callback && e.dataTransfer.files) callback(e.dataTransfer.files);
    },
    [disabled],
  );

  return {
    isDrop,
    onHandleDragEnter,
    onHandleDragExit,
    onHandleFileUpload,
    onHandleFileDrop,
  };
};

export default useFileUploaderEvent;
