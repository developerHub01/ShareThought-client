"use client";

import React, { ChangeEvent, useCallback, useMemo } from "react";
import CountBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/CountBlock";
import {
  addStyle,
  TypographyType,
} from "@/redux/features/builders/blogBuilderSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import { EDITOR_TYPOGRAPHY_SIZE } from "@/constant";
import filterStyle from "@/utils/editor/filterStyle";

const FontSizeProperty = () => {
  const dispatch = useAppDispatch();
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return null;

  const {
    activeBlock,
    components,
    screenType,
    metaData: { styles = {}, mobileStyles = {} },
  } = useAppSelector((state) => state.blogBuilder.blogs[blogId]);

  if (!activeBlock) return null;

  const typographyType = components[activeBlock].type as TypographyType;

  const activeStyle = useMemo(
    () => ({
      ...filterStyle(styles[activeBlock], "fontSize"),
      ...(screenType === "mobile"
        ? filterStyle(mobileStyles[activeBlock], "fontSize")
        : {}),
    }),
    [styles, activeBlock, mobileStyles, screenType]
  );

  const handleDispatchSize = useCallback(
    (fontSize: number | "inc" | "dec") => {
      dispatch(
        addStyle({
          blogId,
          activeBlockId: activeBlock,
          styles: {
            fontSize,
          },
          defaultStyles: {
            fontSize: EDITOR_TYPOGRAPHY_SIZE.FONT_SIZE.DEFAULT[typographyType],
          },
          minStyles: {
            fontSize: EDITOR_TYPOGRAPHY_SIZE.FONT_SIZE.MIN,
          },
          maxStyles: {
            fontSize: EDITOR_TYPOGRAPHY_SIZE.FONT_SIZE.MAX,
          },
        })
      );
    },
    [blogId, activeBlock, typographyType]
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(
      Math.max(Number(e.target.value), EDITOR_TYPOGRAPHY_SIZE.FONT_SIZE.MIN),
      EDITOR_TYPOGRAPHY_SIZE.FONT_SIZE.MAX
    );

    handleDispatchSize(value);
  };

  return (
    <CountBlock
      label="Font Size"
      value={
        Number(activeStyle?.fontSize) ||
        EDITOR_TYPOGRAPHY_SIZE.FONT_SIZE.DEFAULT[typographyType]
      }
      handleIncrement={() => handleDispatchSize("inc")}
      handleDecrement={() => handleDispatchSize("dec")}
      handleChange={handleChange}
      min={EDITOR_TYPOGRAPHY_SIZE.FONT_SIZE.MIN}
      max={EDITOR_TYPOGRAPHY_SIZE.FONT_SIZE.MAX}
    />
  );
};

export default FontSizeProperty;
