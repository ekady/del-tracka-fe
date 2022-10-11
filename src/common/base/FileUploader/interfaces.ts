import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';
import { FunctionVoidWithParams } from '@/common/types';

export interface Thumbnail {
  src: string;
  size: string | number;
  name: string;
}

export interface FileUploaderProps<FileType> {
  value?: FileType | null;
  handleValue?: FunctionVoidWithParams<FileType | null>;
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
  error?: FieldError;
  disabled?: boolean;
  InputProps?: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
}