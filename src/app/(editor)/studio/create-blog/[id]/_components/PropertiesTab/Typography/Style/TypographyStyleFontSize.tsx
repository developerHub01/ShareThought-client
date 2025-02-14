"use client";

import React, { ChangeEvent, CSSProperties } from "react";
import CountBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/CountBlock";
import {
  addStyle,
  TypographyType,
} from "@/redux/features/builders/blogBuilderSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import { EDITOR_TYPOGRAPHY_SIZE } from "@/constant";

const TypographyStyleFontSize = () => {
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

  const activeStyle = styles[activeBlock] as CSSProperties;

  const handleFontSizeIncrement = () => {
    // dispatch(
    //   addStyle({
    //     blogId,
    //     activeBlockId: activeBlock,
    //     styles: {
    //       fontSize: "inc",
    //     },
    //   })
    // );
  };

  const handleFontSizeDecrement = () => {
    // dispatch(
    //   addStyle({
    //     blogId,
    //     activeBlockId: activeBlock,
    //     styles: {
    //       fontSize: "dec",
    //     },
    //   })
    // );
  };

  const handleFontSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    const fontSize =
      value < EDITOR_TYPOGRAPHY_SIZE.MIN_SIZE
        ? EDITOR_TYPOGRAPHY_SIZE.MIN_SIZE
        : value > EDITOR_TYPOGRAPHY_SIZE.MAX_SIZE
        ? EDITOR_TYPOGRAPHY_SIZE.MAX_SIZE
        : value;

    dispatch(
      addStyle({
        blogId,
        activeBlockId: activeBlock,
        styles: {
          fontSize,
        },
      })
    );
  };

  return (
    <CountBlock
      label="Font Size"
      value={
        Number(activeStyle?.fontSize) ||
        EDITOR_TYPOGRAPHY_SIZE.DEFAULT_SIZE[typographyType]
      }
      handleIncrement={handleFontSizeIncrement}
      handleDecrement={handleFontSizeDecrement}
      handleChange={handleFontSizeChange}
      min={EDITOR_TYPOGRAPHY_SIZE.MIN_SIZE}
      max={EDITOR_TYPOGRAPHY_SIZE.MAX_SIZE}
    />
  );
};

export default TypographyStyleFontSize;
