"use client";

import React, { ChangeEvent, memo, useCallback } from "react";
import CountBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/CountBlock";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import { EDITOR_DEFAULT_VALUES } from "@/constant";
import { addGlobalStyle } from "@/redux/features/builders/blogBuilderSlice";
import useActiveStyleSettingTab from "@/hooks/editor/use-active-style-setting-tab";
import {
  selectBlogGlobalStyle,
  selectBlogScreenType,
} from "@/redux/features/builders/selectors";

interface GapSizeProps {
  type: "row" | "column";
  label: string;
}

const GapSize = memo(({ type, label }: GapSizeProps) => {
  const dispatch = useAppDispatch();
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return null;

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
    propertyName: "gap",
  });

  const handleDispatchSize = useCallback(
    (gap: number | "inc" | "dec") => {
      dispatch(
        addGlobalStyle({
          blogId,
          type,
          styles: {
            gap,
          },
          maxStyles: {
            gap: EDITOR_DEFAULT_VALUES.GAP.MAX,
          },
          minStyles: {
            gap: EDITOR_DEFAULT_VALUES.GAP.MIN,
          },
        })
      );
    },
    [blogId]
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(
      Math.max(Number(e.target.value), EDITOR_DEFAULT_VALUES.GAP.MIN),
      EDITOR_DEFAULT_VALUES.FONT_SIZE.MAX
    );

    handleDispatchSize(value);
  };

  return (
    <CountBlock
      label={label}
      value={Number(activeStyle?.gap ?? EDITOR_DEFAULT_VALUES.GAP.DEFAULT)}
      handleIncrement={() => handleDispatchSize("inc")}
      handleDecrement={() => handleDispatchSize("dec")}
      handleChange={handleChange}
      min={EDITOR_DEFAULT_VALUES.GAP.MIN}
      max={EDITOR_DEFAULT_VALUES.GAP.MAX}
    />
  );
});

export default GapSize;
