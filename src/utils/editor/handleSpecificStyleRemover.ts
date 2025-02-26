import { StyleType } from "@/redux/features/builders/blogBuilderSlice";
import { CSSProperties } from "react";

const handleSpecificStyleRemover = (
  styles: StyleType,
  styleType: keyof CSSProperties
): StyleType => {
  for (const key in styles) {
    if (key.startsWith(styleType)) delete styles[key];
  }
  return styles;
};

export default handleSpecificStyleRemover;
