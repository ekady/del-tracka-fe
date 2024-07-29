interface IForceFileDownloadOptions {
  filename?: string;
  fileFormat?: string;
}

export const forceFileDownload = (blob: Blob, options?: IForceFileDownloadOptions): void => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  const fileName = `${options?.filename}-${new Date().toLocaleDateString()}.${options?.fileFormat}`;
  link.href = url;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
};
