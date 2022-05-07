import { IndexableFile } from '@/common/types';

export interface FileUploaderProps {
  multiple?: boolean;
  value: IndexableFile;
  handleValue: (files: IndexableFile) => void;
  accept?: readonly string[];
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
