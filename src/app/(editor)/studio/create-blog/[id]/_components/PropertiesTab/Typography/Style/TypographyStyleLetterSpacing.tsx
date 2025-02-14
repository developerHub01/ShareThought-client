"use client";

import React, { ChangeEvent, CSSProperties } from "react";
import CountBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/CountBlock";
import { EDITOR_TABLE_SIZE } from "@/constant";
import { addStyle } from "@/redux/features/builders/blogBuilderSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";

const TypographyStyleLetterSpacing = () => {
  const dispatch = useAppDispatch();
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return null;

  const {
    activeBlock,
    metaData: { styles },
  } = useAppSelector((state) => state.blogBuilder.blogs[blogId]);

  if (!activeBlock) return null;

  const activeStyle = styles[activeBlock] as CSSProperties;

  /* Columns content =========== */
  const handleLetterSpacingIncrement = () => {
    // dispatch(
    //   changeTableContentStyle({
    //     blogId,
    //     id: activeBlock,
    //     letterSpacing: "inc",
    //   })
    // );
  };

  const handleLetterSpacingDecrement = () => {
    // dispatch(
    //   changeTableContentStyle({
    //     blogId,
    //     id: activeBlock,
    //     letterSpacing: "dec",
    //   })
    // );
  };

  const handleLetterSpacingChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    const letterSpacing = value < 0 ? 0 : value > 8 ? 8 : value;

    dispatch(
      addStyle({
        blogId,
        activeBlockId: activeBlock,
        styles: {
          letterSpacing: letterSpacing,
        },
      })
    );
  };

  return (
    <CountBlock
      label="Letter Spacing"
      value={Number(activeStyle?.letterSpacing) || 1}
      handleIncrement={handleLetterSpacingIncrement}
      handleDecrement={handleLetterSpacingDecrement}
      handleChange={handleLetterSpacingChange}
      min={EDITOR_TABLE_SIZE.MIN_CONTENT_LETTER_SPACING}
      max={EDITOR_TABLE_SIZE.MAX_CONTENT_LETTER_SPACING}
    />
  );
};

export default TypographyStyleLetterSpacing;
