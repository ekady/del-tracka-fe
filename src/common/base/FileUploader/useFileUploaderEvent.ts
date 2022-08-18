import { FunctionVoidWithParams } from '@/common/types';
import { ChangeEvent, DragEvent, useState } from 'react';

export type ReturnTypeFileUploaderEvent = {
  isDrop: boolean;
  onHandleDragEnter: (e: DragEvent<HTMLDivElement>) => void;
  onHandleDragExit: (e: DragEvent<HTMLDivElement>) => void;
  onHandleFileUpload: (e: ChangeEvent<HTMLInputElement>, callback?: FunctionVoidWithParams<FileList>) => void;
  onHandleFileDrop: (e: DragEvent<HTMLDivElement>, callback?: FunctionVoidWithParams<FileList>) => void;
};

const useFileUploaderEvent = (disabled: boolean): ReturnTypeFileUploaderEvent => {
  const [isDrop, setIsDrop] = useState<boolean>(false);

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

  const onHandleFileUpload = (e: ChangeEvent<HTMLInputElement>, callback?: FunctionVoidWithParams<FileList>): void => {
    if (disabled) return;
    e.preventDefault();
    if (callback && e.target.files) callback(e.target.files);
  };

  const onHandleFileDrop = (e: DragEvent<HTMLDivElement>, callback?: FunctionVoidWithParams<FileList>): void => {
    if (disabled) return;
    e.preventDefault();
    setIsDrop(false);
    if (callback && e.dataTransfer.files) callback(e.dataTransfer.files);
  };

  return {
    isDrop,
    onHandleDragEnter,
    onHandleDragExit,
    onHandleFileUpload,
    onHandleFileDrop,
  };
};

export default useFileUploaderEvent;
