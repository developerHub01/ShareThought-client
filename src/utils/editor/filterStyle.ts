import { StyleType } from "@/redux/features/builders/blogBuilderSlice";
import { CSSProperties } from "react";

const filterStyle = (
  styles: StyleType = {},
  styleType: keyof CSSProperties | string
) => {
  return Object.fromEntries(
    Object.entries(styles).filter(
      ([key, value]) => key.includes(styleType) && value !== undefined
    )
  ) as CSSProperties;
};

export default filterStyle;
