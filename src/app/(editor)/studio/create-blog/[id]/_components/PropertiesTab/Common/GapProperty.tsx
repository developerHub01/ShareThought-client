"use client";

import React, { ChangeEvent, useCallback } from "react";
import CountBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/CountBlock";
import { addStyle } from "@/redux/features/builders/blogBuilderSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import { EDITOR_DEFAULT_VALUES } from "@/constant";
import useActiveStylePropertyTab from "@/hooks/editor/use-active-style-property-tab";

const GapProperty = () => {
  const dispatch = useAppDispatch();
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return null;

  const {
    activeBlock,
    screenType = "desktop",
    components,
    metaData: { styles = {}, mobileStyles = {}, globalStyles },
  } = useAppSelector((state) => state.blogBuilder.blogs[blogId]);

  if (!activeBlock) return null;

  const { type } = components[activeBlock];

  const activeStyle = useActiveStylePropertyTab({
    activeBlock,
    type,
    globalStyles,
    styles,
    mobileStyles,
    screenType,
    propertyName: "gap",
  });

  const handleDispatchSize = useCallback(
    (gap: number | "inc" | "dec") => {
      dispatch(
        addStyle({
          blogId,
          activeBlockId: activeBlock,
          styles: {
            gap,
          },
          defaultStyles: {
            gap: EDITOR_DEFAULT_VALUES.GAP.DEFAULT,
          },
          minStyles: {
            gap: EDITOR_DEFAULT_VALUES.GAP.MIN,
          },
          maxStyles: {
            gap: EDITOR_DEFAULT_VALUES.GAP.MAX,
          },
        })
      );
    },
    [blogId, activeBlock, type]
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(
      Math.max(Number(e.target.value), EDITOR_DEFAULT_VALUES.GAP.MIN),
      EDITOR_DEFAULT_VALUES.GAP.MAX
    );

    handleDispatchSize(value);
  };

  return (
    <CountBlock
      label="Gap"
      value={Number(activeStyle?.gap) || EDITOR_DEFAULT_VALUES.GAP.DEFAULT}
      handleIncrement={() => handleDispatchSize("inc")}
      handleDecrement={() => handleDispatchSize("dec")}
      handleChange={handleChange}
      min={EDITOR_DEFAULT_VALUES.GAP.MIN}
      max={EDITOR_DEFAULT_VALUES.GAP.MAX}
    />
  );
};

export default GapProperty;
