"use client";

import React, { ChangeEvent, useCallback } from "react";
import CountBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/CountBlock";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import { EDITOR_TYPOGRAPHY_SIZE } from "@/constant";
import { useSettingTypography } from "@/app/(editor)/studio/create-blog/[id]/_context/SettingTab/SettingTypographyProvider";
import { addGlobalStyle } from "@/redux/features/builders/blogBuilderSlice";

const TypographyFontSize = () => {
  const dispatch = useAppDispatch();
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return null;

  const { selectedTypography } = useSettingTypography();

  if (!selectedTypography) return null;

  const {
    metaData: { globalStyles = {} },
  } = useAppSelector((state) => state.blogBuilder.blogs[blogId]);

  const handleDispatchSize = useCallback(
    (fontSize: number | "inc" | "dec") => {
      dispatch(
        addGlobalStyle({
          blogId,
          type: selectedTypography,
          styles: {
            fontSize,
          },
          maxStyles: {
            fontSize: EDITOR_TYPOGRAPHY_SIZE.FONT_SIZE.MAX,
          },
          minStyles: {
            fontSize: EDITOR_TYPOGRAPHY_SIZE.FONT_SIZE.MIN,
          },
        })
      );
    },
    [blogId, selectedTypography]
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(
      Math.max(Number(e.target.value), EDITOR_TYPOGRAPHY_SIZE.FONT_SIZE.MIN),
      EDITOR_TYPOGRAPHY_SIZE.FONT_SIZE.MAX
    );

    handleDispatchSize(value);
  };

  console.log({ selectedTypography });
  console.log(globalStyles[selectedTypography]);
  const fontSize = globalStyles[selectedTypography].fontSize as number;

  return (
    <CountBlock
      label="Font Size"
      value={fontSize}
      handleIncrement={() => handleDispatchSize("inc")}
      handleDecrement={() => handleDispatchSize("dec")}
      handleChange={handleChange}
      min={EDITOR_TYPOGRAPHY_SIZE.FONT_SIZE.MIN}
      max={EDITOR_TYPOGRAPHY_SIZE.FONT_SIZE.MAX}
    />
  );
};

export default TypographyFontSize;
