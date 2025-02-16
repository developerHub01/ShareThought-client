"use client";

import React, { ChangeEvent, CSSProperties, useCallback, useMemo } from "react";
import CountBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/CountBlock";
import { EDITOR_TYPOGRAPHY_SIZE } from "@/constant";
import { addStyle } from "@/redux/features/builders/blogBuilderSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";

const LetterSpacingProperty = () => {
  const dispatch = useAppDispatch();
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return null;

  const {
    activeBlock,
    metaData: { styles },
  } = useAppSelector((state) => state.blogBuilder.blogs[blogId]);

  if (!activeBlock) return null;

  const activeStyle = useMemo(
    () => styles[activeBlock] as CSSProperties,
    [styles, activeBlock]
  );

  const handleDispatchSpacing = useCallback(
    (letterSpacing: number | "inc" | "dec") => {
      dispatch(
        addStyle({
          blogId,
          activeBlockId: activeBlock,
          styles: {
            letterSpacing: letterSpacing,
          },
          defaultStyles: {
            letterSpacing: EDITOR_TYPOGRAPHY_SIZE.LETTER_SPACING.DEFAULT,
          },
          minStyles: {
            letterSpacing: EDITOR_TYPOGRAPHY_SIZE.LETTER_SPACING.MAX,
          },
          maxStyles: {
            letterSpacing: EDITOR_TYPOGRAPHY_SIZE.LETTER_SPACING.MIN,
          },
        })
      );
    },
    [blogId, activeBlock]
  );

  const handleLetterSpacingChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(
      Math.max(
        Number(e.target.value),
        EDITOR_TYPOGRAPHY_SIZE.LETTER_SPACING.MIN
      ),
      EDITOR_TYPOGRAPHY_SIZE.LETTER_SPACING.MAX
    );

    handleDispatchSpacing(value);
  };

  return (
    <CountBlock
      label="Letter Spacing"
      value={
        Number(activeStyle?.letterSpacing) ||
        EDITOR_TYPOGRAPHY_SIZE.LETTER_SPACING.DEFAULT
      }
      handleIncrement={() => handleDispatchSpacing("inc")}
      handleDecrement={() => handleDispatchSpacing("dec")}
      handleChange={handleLetterSpacingChange}
      min={EDITOR_TYPOGRAPHY_SIZE.LETTER_SPACING.MIN}
      max={EDITOR_TYPOGRAPHY_SIZE.LETTER_SPACING.MAX}
    />
  );
};

export default LetterSpacingProperty;
