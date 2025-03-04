"use client";

import React, { ChangeEvent, useCallback } from "react";
import CountBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/CountBlock";
import { addStyle } from "@/redux/features/builders/blogBuilderSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import { GAP_SIZE } from "@/constant";
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
            gap: GAP_SIZE.DEFAULT,
          },
          minStyles: {
            gap: GAP_SIZE.MIN,
          },
          maxStyles: {
            gap: GAP_SIZE.MAX,
          },
        })
      );
    },
    [blogId, activeBlock, type]
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(
      Math.max(Number(e.target.value), GAP_SIZE.MIN),
      GAP_SIZE.MAX
    );

    handleDispatchSize(value);
  };

  return (
    <CountBlock
      label="Gap"
      value={Number(activeStyle?.gap) || GAP_SIZE.DEFAULT}
      handleIncrement={() => handleDispatchSize("inc")}
      handleDecrement={() => handleDispatchSize("dec")}
      handleChange={handleChange}
      min={GAP_SIZE.MIN}
      max={GAP_SIZE.MAX}
    />
  );
};

export default GapProperty;
