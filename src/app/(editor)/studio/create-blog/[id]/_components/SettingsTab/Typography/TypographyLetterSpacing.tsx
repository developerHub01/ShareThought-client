"use client";

import React, { ChangeEvent, useCallback, useMemo } from "react";
import CountBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/CountBlock";
import { EDITOR_DEFAULT_VALUES } from "@/constant";
import {
  addGlobalStyle,
  StyleType,
} from "@/redux/features/builders/blogBuilderSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import { useSettingTypography } from "@/app/(editor)/studio/create-blog/[id]/_context/SettingTab/SettingTypographyProvider";
import filterStyle from "@/utils/editor/filterStyle";

const TypographyLetterSpacing = () => {
  const dispatch = useAppDispatch();
  const { id: blogId } = useParams<{ id: string }>();
  const { selectedTypography: type } = useSettingTypography();

  if (!blogId || !type) return null;

  const {
    screenType = "desktop",
    metaData: { globalStyles },
  } = useAppSelector((state) => state.blogBuilder.blogs[blogId]);

  const activeStyle = useMemo(
    () => ({
      ...filterStyle(
        globalStyles["desktop"][type] as StyleType,
        "letterSpacing"
      ),
      ...(screenType === "mobile"
        ? filterStyle(
            globalStyles["mobile"][type] as StyleType,
            "letterSpacing"
          )
        : {}),
    }),
    [type, screenType, globalStyles]
  );

  const handleDispatchSpacing = useCallback(
    (letterSpacing: number | "inc" | "dec") => {
      dispatch(
        addGlobalStyle({
          blogId,
          type,
          styles: {
            letterSpacing: letterSpacing,
          },
          minStyles: {
            letterSpacing: EDITOR_DEFAULT_VALUES.LETTER_SPACING.MIN,
          },
          maxStyles: {
            letterSpacing: EDITOR_DEFAULT_VALUES.LETTER_SPACING.MAX,
          },
        })
      );
    },
    [blogId, type]
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(
      Math.max(
        Number(e.target.value),
        EDITOR_DEFAULT_VALUES.LETTER_SPACING.MIN
      ),
      EDITOR_DEFAULT_VALUES.LETTER_SPACING.MAX
    );

    handleDispatchSpacing(value);
  };

  return (
    <CountBlock
      label="Letter Spacing"
      value={
        activeStyle?.letterSpacing ??
        EDITOR_DEFAULT_VALUES.LETTER_SPACING.DEFAULT[type]
      }
      handleIncrement={() => handleDispatchSpacing("inc")}
      handleDecrement={() => handleDispatchSpacing("dec")}
      handleChange={handleChange}
      min={EDITOR_DEFAULT_VALUES.LETTER_SPACING.MIN}
      max={EDITOR_DEFAULT_VALUES.LETTER_SPACING.MAX}
      step="0.01"
    />
  );
};

export default TypographyLetterSpacing;
