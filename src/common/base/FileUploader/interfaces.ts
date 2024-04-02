import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';
import { TFunctionVoidWithParams } from '@/common/types';

export interface IFileUploaderProps<FileType> {
  value?: FileType | null;
  handleValue?: TFunctionVoidWithParams<FileType | null>;
  accept?: readonly string[];
  buttonUploadText?: string;
  description?: string;
  hideDescription?: boolean;
  buttonOutsideContainer?: boolean;
  hideRemoveIcon?: boolean;
  hideTextFile?: boolean;
  widthContainer?: number | string;
  heightContainer?: number | string;
  width?: number | string;
  height?: number | string;
  error?: Pick<FieldError, 'type'>;
  disabled?: boolean;
  InputProps?: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
  maxSizeKb?: number;
}
