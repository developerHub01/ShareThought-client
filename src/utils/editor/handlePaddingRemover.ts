import { StyleType } from "@/redux/features/builders/blogBuilderSlice";

const handlePaddingRemover = (styles: StyleType): StyleType => {
  for (const key in styles) {
    if (key.startsWith("padding")) delete styles[key];
  }
  return styles;
};

export default handlePaddingRemover;
