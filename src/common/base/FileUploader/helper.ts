import { Thumbnail } from './types';

export const extractSrcThumbnailFile = (x: Thumbnail | File): string => {
  if ('src' in x) return x.src;
  return URL.createObjectURL(x);
};

export const getFileExtension = (filename: string) => {
  return filename.substring(filename.lastIndexOf('.') + 1, filename.length) || filename;
};
