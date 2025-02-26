import { StyleType } from "@/redux/features/builders/blogBuilderSlice";

const handleBoxShadowExtractor = (
  styles: StyleType
): Record<string, string> => {
  const filteredStyles: Record<string, string> = {};

  for (const key in styles) {
    let style = styles[key];
    if (key.startsWith("boxShadow")) {
      if (Array.isArray(style)) {
        const validValue = style
          .map((item, index) => (index < 4 ? `${item}px` : item))
          .join(" ");

        filteredStyles[key] = validValue;
      } else {
        filteredStyles[key] = style as string;
      }
    }
  }

  return filteredStyles;
};

export default handleBoxShadowExtractor;
