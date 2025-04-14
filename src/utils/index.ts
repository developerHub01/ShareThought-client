declare global {
  interface String {
    toCapitalCase(): string;
  }
}

String.prototype.toCapitalCase = function (): string {
  return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};

export const convertNumberToWords = (number: number): string => {
  let contextNumber =
    number < 1000 ? number.toString() : (number / 1000).toFixed(2) + "K";

  const modifiedNumber = Number(contextNumber?.split("K")[0]);

  if (number !== modifiedNumber && modifiedNumber !== number / 1000)
    contextNumber += " +";

  return contextNumber;
};

export const isValidHexColor = (hex: string) => {
  const hexRegex =
    /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{4}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/;

  return hexRegex.test(hex);
};

export const isBlobURL = (string: string) => {
  return typeof string === "string" && string.startsWith("blob:");
};

export const isValidURL = (string: string): boolean => {
  const regex = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w-./?%&=]*)?$/i;
  return regex.test(string);
};

export const isValidYoutubeVideoURL = (url: string): boolean => {
  const regex =
    /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|shorts\/)|youtu\.be\/)([\w-]{11})([?&=]*)?/;
  return regex.test(url);
};

export const getYoutubeVideoId = (url: string): string | null => {
  const regExp =
    /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([\w-]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : null;
};

export const processFiles = ({
  files,
  type = "image/",
  limit = 1,
}: {
  files: FileList;
  type?: string;
  limit?: number;
}) => {
  const images: Array<string> = [];
  const fileList = Array.from(files).slice(0, limit);

  for (const file of fileList) {
    if (!file.type.startsWith(type)) return null;

    images.push(URL.createObjectURL(file));
  }

  return images;
};
