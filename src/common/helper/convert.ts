import { PaginationParams, PaginationParamsText } from '@/types';
import { FileIndexable, Thumbnail } from '../base/FileUploader';

export const convertFileToUrl = (file: File | string | null): string => {
  if (file) {
    if (file instanceof File) return URL.createObjectURL(file);
    if (typeof file === 'string') return file;
  }
  return '';
};

export function formatBytes(bytes?: number, decimals = 2) {
  if (!bytes || bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export const convertImageIndexableFormData = (
  formData: FormData,
  image: FileIndexable,
  keyFile: string,
  keyThumbnail?: string,
): void => {
  if (image && Object.keys(image).length) {
    Object.keys(image).forEach((img) => {
      if (!!image && image[img]) {
        if ('src' in image[img] && keyThumbnail) formData.append(keyThumbnail, (image[img] as Thumbnail).src);
        else formData.append(keyFile, image[img] as File);
      }
    });
  }
};

export const convertParams = (params?: PaginationParams): PaginationParams => {
  if (params) {
    return Object.keys(params).reduce((pr, param) => {
      const paramText = param as PaginationParamsText;
      if (params[paramText]) return { ...pr, [paramText]: params[paramText] };
      return pr;
    }, {});
  }
  return {};
};
