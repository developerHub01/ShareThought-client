export const hexToRgba = (hex: string) => {
  if (hex === "transparent") return "rgba(0, 0, 0, 0)";

  hex = hex.replace(/^#/, "");

  let r,
    g,
    b,
    a = 255;

  if (hex.length === 3 || hex.length === 4) {
    r = parseInt(hex[0] + hex[0], 16);
    g = parseInt(hex[1] + hex[1], 16);
    b = parseInt(hex[2] + hex[2], 16);
    if (hex.length === 4) a = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 6 || hex.length === 8) {
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
    if (hex.length === 8) a = parseInt(hex.substring(6, 8), 16);
  } else {
    throw new Error("Invalid HEX format");
  }

  return `rgba(${r}, ${g}, ${b}, ${a / 255})`;
};

export const rgbaToHex = (r: number, g: number, b: number, a = 1) => {
  const toHex = (c: number): string =>
    Math.round(c).toString(16).padStart(2, "0");

  const alphaHex = Math.round(a * 255)
    .toString(16)
    .padStart(2, "0");

  return `#${toHex(r)}${toHex(g)}${toHex(b)}${a < 1 ? alphaHex : ""}`;
};
