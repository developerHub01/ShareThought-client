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
