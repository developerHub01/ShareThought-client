"use client";

import React, { ChangeEvent, memo, useCallback } from "react";
import CountBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/CountBlock";
import { EDITOR_DEFAULT_VALUES } from "@/constant";
import { addGlobalStyle } from "@/redux/features/builders/blogBuilderSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import { useSettingTypography } from "@/app/(editor)/studio/create-blog/[id]/_context/SettingTab/SettingTypographyProvider";
import useActiveStyleSettingTab from "@/hooks/editor/use-active-style-setting-tab";
import {
  selectBlogGlobalStyle,
  selectBlogScreenType,
} from "@/redux/features/builders/selectors";

const TypographyLetterSpacing = memo(() => {
  const dispatch = useAppDispatch();
  const { id: blogId } = useParams<{ id: string }>();
  const { selectedTypography: type } = useSettingTypography();

  if (!blogId || !type) return null;

  const screenType = useAppSelector((state) =>
    selectBlogScreenType(state, blogId)
  );
  const globalStyles = useAppSelector((state) =>
    selectBlogGlobalStyle(state, blogId)
  );

  const activeStyle = useActiveStyleSettingTab({
    globalStyles,
    screenType,
    type,
    propertyName: "letterSpacing",
  });

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
        Number(activeStyle?.letterSpacing) ??
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
});

export default TypographyLetterSpacing;
