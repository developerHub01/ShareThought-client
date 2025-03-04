"use client";

import {
  BlockTypes,
  ScreenTypes,
  StylesInterface,
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
  activeBlock: string;
  styles: StylesInterface;
  mobileStyles?: StylesInterface;
  screenType?: ScreenTypes;
  propertyName: keyof CSSProperties;
}

const useActiveStylePropertyTab = ({
  type,
  globalStyles,
  activeBlock,
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
      ...filterStyle(styles[activeBlock], propertyName),
      ...(screenType === "mobile"
        ? filterStyle(mobileStyles[activeBlock], propertyName)
        : {}),
    }),
    [styles, activeBlock, mobileStyles, screenType, activeStyle]
  );
};

export default useActiveStylePropertyTab;
