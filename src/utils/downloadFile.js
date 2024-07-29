// src/utils/downloadFile.js
export const downloadFile = (file, fileName) => {
  const url = URL.createObjectURL(file);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  return url; // Return the local URL of the file
};
