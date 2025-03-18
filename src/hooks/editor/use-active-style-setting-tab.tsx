"use client";

import {
  BlockTypes,
  ScreenTypes,
  StyleType,
} from "@/redux/features/builders/blogBuilderSlice";
import filterStyle from "@/utils/editor/filterStyle";
import { CSSProperties, useMemo } from "react";

interface useActiveStylePropertyTabProps {
  globalStyles: {
    mobile: Record<string, unknown>;
    desktop: Record<string, unknown>;
  };
  screenType: ScreenTypes;
  type: BlockTypes;
  propertyName: keyof CSSProperties;
}

const useActiveStyleSettingTab = ({
  globalStyles,
  screenType = "desktop",
  type,
  propertyName,
}: useActiveStylePropertyTabProps): CSSProperties => {
  return useMemo(
    () => ({
      ...filterStyle(globalStyles["desktop"][type] as StyleType, propertyName),
      ...(screenType === "mobile"
        ? filterStyle(globalStyles["mobile"][type] as StyleType, propertyName)
        : {}),
    }),
    [type, screenType, globalStyles]
  );
};

export default useActiveStyleSettingTab;
