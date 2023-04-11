export const autoDownload = (file: Blob, fileName = 'File') => {
  const downloadUrl = URL.createObjectURL(file);
  const anchor = document.createElement('a');
  document.body.appendChild(anchor);
  anchor.download = `${fileName}.xlsx`;
  anchor.href = downloadUrl;
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(downloadUrl);
};
