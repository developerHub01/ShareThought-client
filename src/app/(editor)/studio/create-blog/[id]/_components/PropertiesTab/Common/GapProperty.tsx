"use client";

import React, { ChangeEvent, useCallback, useMemo } from "react";
import CountBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/CountBlock";
import {
  addStyle,
  TypographyType,
} from "@/redux/features/builders/blogBuilderSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import { GAP_SIZE } from "@/constant";
import filterStyle from "@/utils/editor/filterStyle";

const GapProperty = () => {
  const dispatch = useAppDispatch();
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return null;

  const {
    activeBlock,
    screenType,
    components,
    metaData: { styles = {}, mobileStyles = {} },
  } = useAppSelector((state) => state.blogBuilder.blogs[blogId]);

  if (!activeBlock) return null;

  const typographyType = components[activeBlock].type as TypographyType;

  const activeStyle = useMemo(
    () => ({
      ...filterStyle(styles[activeBlock], "gap"),
      ...(screenType === "mobile"
        ? filterStyle(mobileStyles[activeBlock], "gap")
        : {}),
    }),
    [styles, mobileStyles, activeBlock, screenType]
  );

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
    [blogId, activeBlock, typographyType]
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
