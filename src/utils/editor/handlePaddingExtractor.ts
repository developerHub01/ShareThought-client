import { StyleType } from "@/redux/features/builders/blogBuilderSlice";

const handlePaddingExtractor = (styles: StyleType): Record<string, number> => {
  const filteredStyles: Record<string, number> = {};

  for (const key in styles) {
    if (typeof styles[key] !== "number") continue;
    if (key.startsWith("padding")) filteredStyles[key] = styles[key];
  }

  return filteredStyles;
};

export default handlePaddingExtractor;
