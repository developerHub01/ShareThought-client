const toCapitalize = (str: string) => {
  const temp = str.split("");
  temp[0] = temp[0].toUpperCase();

  return temp.join("");
};

export const Utils = { toCapitalize };
