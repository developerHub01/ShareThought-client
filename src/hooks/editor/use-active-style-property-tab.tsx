"use client";

import {
  BlockTypes,
  ScreenTypes,
  StyleType,
} from "@/redux/features/builders/blogBuilderSlice";
import filterStyle from "@/utils/editor/filterStyle";
import { CSSProperties, useMemo } from "react";
import useActiveStyleSettingTab from "@/hooks/editor/use-active-style-setting-tab";

interface useActiveStylePropertyTabProps {
  type: BlockTypes;
  globalStyles?: {
    desktop: Record<string, unknown>;
    mobile: Record<string, unknown>;
  };
  styles: StyleType;
  mobileStyles?: StyleType;
  screenType?: ScreenTypes;
  propertyName: keyof CSSProperties;
}

const useActiveStylePropertyTab = ({
  type,
  globalStyles,
  styles,
  mobileStyles = {},
  screenType = "desktop",
  propertyName,
}: useActiveStylePropertyTabProps) => {
  let activeStyle = !globalStyles
    ? {}
    : useActiveStyleSettingTab({
        globalStyles,
        screenType,
        type,
        propertyName,
      });

  return useMemo(
    () => ({
      ...activeStyle,
      ...filterStyle(styles, propertyName),
      ...(screenType === "mobile"
        ? filterStyle(mobileStyles, propertyName)
        : {}),
    }),
    [styles, mobileStyles, screenType, activeStyle]
  );
};

export default useActiveStylePropertyTab;
