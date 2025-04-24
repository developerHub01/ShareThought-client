import Color from "color";

export const hexToRgba = (hex: string) => {
  if (!hex) return "transparent";

  if (hex === "transparent") return "rgba(0, 0, 0, 0)";

  return Color(hex).rgb().string();
};

export const rgbaToHex = (r: number, g: number, b: number, alpha = 1) =>
  Color.rgb({ r, g, b, alpha }).hexa();

export const toggleColorModeBaseOnMode = (
  color: string,
  theme: "light" | "dark" = "light"
) => {
  if (theme === "light") return color;

  const newColor = Color(color).hsl().array();
  newColor[2] = 100 - newColor[2];
  return Color.hsl(newColor).hex();
};
