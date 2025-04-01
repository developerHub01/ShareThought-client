"use client";

import {
  BlockTypes,
  ScreenTypes,
  StyleType,
} from "@/redux/features/builders/blogBuilderSlice";
import { useMemo } from "react";

interface useCombinedResponsiveSettingStylesProps {
  type: BlockTypes;
  globalStyles?: {
    desktop: Record<string, unknown>;
    mobile: Record<string, unknown>;
  };
  styles: StyleType;
  mobileStyles?: StyleType;
  screenType?: ScreenTypes;
}

const useCombinedResponsiveSettingStyles = ({
  type,
  globalStyles,
  styles,
  mobileStyles = {},
  screenType = "desktop",
}: useCombinedResponsiveSettingStylesProps) => {
  const combinedStyles = useMemo(() => {
    return {
      ...(globalStyles?.desktop?.[type] ?? {}),
      ...(screenType === "mobile"
        ? {
            ...(globalStyles?.mobile?.[type] ?? {}),
          }
        : {}),
      ...styles,
      ...(screenType === "mobile"
        ? {
            ...(mobileStyles ?? {}),
          }
        : {}),
    };
  }, [styles, screenType, globalStyles, mobileStyles, type]);

  return combinedStyles;
};

export default useCombinedResponsiveSettingStyles;
