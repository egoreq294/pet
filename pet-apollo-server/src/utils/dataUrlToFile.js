import { File } from "node:buffer";

export const dataURLtoFile = async (dataUrl, fileName, fileType) => {
  const res = await fetch(dataUrl);
  const blob = await res.blob();

  const file = new File([blob], fileName, {
    type: fileType,
  });

  return file;
};
