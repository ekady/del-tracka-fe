import { IPaginationParams, PaginationParamsText } from '@/common/types';

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

export const convertParams = (params?: IPaginationParams): IPaginationParams => {
  if (params) {
    return Object.keys(params).reduce((pr, param) => {
      const paramText = param as PaginationParamsText;
      if (params[paramText]) return { ...pr, [paramText]: params[paramText] };
      return pr;
    }, {});
  }
  return {};
};

export const convertFilePathToUrl = (path: string): string => {
  if (!path) return '';

  if (path.includes('http')) return path;
  return `${process.env.NEXT_PUBLIC_API_URL_V1}/${path}`;
};
