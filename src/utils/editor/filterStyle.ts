import { StyleType } from "@/redux/features/builders/blogBuilderSlice";
import { CSSProperties } from "react";

const filterStyle = (styles: StyleType, styleType: keyof CSSProperties) => {
  return Object.fromEntries(
    Object.entries(styles).filter(
      ([key, value]) => key.includes(styleType) && value !== undefined
    )
  ) as Record<string, number>;
};

export default filterStyle;
