"use client";

import React, { ChangeEvent, memo, useCallback } from "react";
import CountBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/CountBlock";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import { EDITOR_DEFAULT_VALUES } from "@/constant";
import { useSettingTypography } from "@/app/(editor)/studio/create-blog/[id]/_context/SettingTab/SettingTypographyProvider";
import { addGlobalStyle } from "@/redux/features/builders/blogBuilderSlice";
import useActiveStyleSettingTab from "@/hooks/editor/use-active-style-setting-tab";
import {
  selectBlogGlobalStyle,
  selectBlogScreenType,
} from "@/redux/features/builders/selectors";

const TypographyFontSize = memo(() => {
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
    propertyName: "fontSize",
  });

  const handleDispatchSize = useCallback(
    (fontSize: number | "inc" | "dec") => {
      dispatch(
        addGlobalStyle({
          blogId,
          type,
          styles: {
            fontSize,
          },
          maxStyles: {
            fontSize: EDITOR_DEFAULT_VALUES.FONT_SIZE.MAX,
          },
          minStyles: {
            fontSize: EDITOR_DEFAULT_VALUES.FONT_SIZE.MIN,
          },
        })
      );
    },
    [blogId, type]
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(
      Math.max(Number(e.target.value), EDITOR_DEFAULT_VALUES.FONT_SIZE.MIN),
      EDITOR_DEFAULT_VALUES.FONT_SIZE.MAX
    );

    handleDispatchSize(value);
  };

  return (
    <CountBlock
      label="Font Size"
      value={Number(
        activeStyle?.fontSize ?? EDITOR_DEFAULT_VALUES.FONT_SIZE.DEFAULT
      )}
      handleIncrement={() => handleDispatchSize("inc")}
      handleDecrement={() => handleDispatchSize("dec")}
      handleChange={handleChange}
      min={EDITOR_DEFAULT_VALUES.FONT_SIZE.MIN}
      max={EDITOR_DEFAULT_VALUES.FONT_SIZE.MAX}
    />
  );
});

export default TypographyFontSize;
