import Compressor from 'compressorjs';

export const compressImage = (image: File): Promise<File> => {
  return new Promise<File>((resolve, reject) => {
    try {
      new Compressor(image, {
        quality: 0.6,
        success(result) {
          resolve(result as File);
        },
        error(err) {
          reject(err);
        },
      });
    } catch {
      //
    }
  });
};
