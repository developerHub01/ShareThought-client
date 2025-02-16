"use client";

import React, { ChangeEvent, CSSProperties, useCallback, useMemo } from "react";
import CountBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/CountBlock";
import {
  addStyle,
  TypographyType,
} from "@/redux/features/builders/blogBuilderSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import { EDITOR_TYPOGRAPHY_SIZE } from "@/constant";

const FontSizeProperty = () => {
  const dispatch = useAppDispatch();
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return null;

  const {
    activeBlock,
    components,
    metaData: { styles },
  } = useAppSelector((state) => state.blogBuilder.blogs[blogId]);

  if (!activeBlock) return null;

  const typographyType = components[activeBlock].type as TypographyType;

  const activeStyle = useMemo(
    () => styles[activeBlock] as CSSProperties,
    [styles, activeBlock]
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

  const handleFontSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
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
      handleChange={handleFontSizeChange}
      min={EDITOR_TYPOGRAPHY_SIZE.FONT_SIZE.MIN}
      max={EDITOR_TYPOGRAPHY_SIZE.FONT_SIZE.MAX}
    />
  );
};

export default FontSizeProperty;
