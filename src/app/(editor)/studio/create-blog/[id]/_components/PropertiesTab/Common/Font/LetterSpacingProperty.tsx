"use client";

import React, { ChangeEvent, useCallback, useMemo } from "react";
import CountBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/CountBlock";
import { EDITOR_DEFAULT_VALUES } from "@/constant";
import { addStyle } from "@/redux/features/builders/blogBuilderSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import useActiveStylePropertyTab from "@/hooks/editor/use-active-style-property-tab";
import ResetToGlobalStyle from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/ResetToGlobalStyle";
import useRemoveStyle from "@/hooks/editor/use-remove-style";

const LetterSpacingProperty = () => {
  const dispatch = useAppDispatch();
  const { id: blogId } = useParams<{ id: string }>();
  const handleReset = useRemoveStyle();

  if (!blogId) return null;

  const {
    activeBlock,
    components,
    screenType = "desktop",
    metaData: { styles = {}, mobileStyles = {}, globalStyles },
  } = useAppSelector((state) => state.blogBuilder.blogs[blogId]);

  if (!activeBlock) return null;

  const { type } = components[activeBlock];

  const haveCustomStyle = useMemo(
    () => "letterSpacing" in styles[activeBlock],
    [activeBlock, styles]
  );

  const activeStyle = useActiveStylePropertyTab({
    type,
    globalStyles,
    activeBlock,
    styles,
    mobileStyles,
    screenType,
    propertyName: "letterSpacing",
  });

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
            letterSpacing: EDITOR_DEFAULT_VALUES.LETTER_SPACING.DEFAULT[type],
          },
          minStyles: {
            letterSpacing: EDITOR_DEFAULT_VALUES.LETTER_SPACING.MIN,
          },
          maxStyles: {
            letterSpacing: EDITOR_DEFAULT_VALUES.LETTER_SPACING.MAX,
          },
        })
      );
    },
    [blogId, activeBlock, type]
  );

  const handleLetterSpacingChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(
      Math.max(
        Number(e.target.value),
        EDITOR_DEFAULT_VALUES.LETTER_SPACING.MIN
      ),
      EDITOR_DEFAULT_VALUES.LETTER_SPACING.MAX
    );

    handleDispatchSpacing(value);
  };

  return (
    <CountBlock
      label="Letter Spacing"
      value={Number(
        activeStyle?.letterSpacing ??
          EDITOR_DEFAULT_VALUES.LETTER_SPACING.DEFAULT[type]
      )}
      handleIncrement={() => handleDispatchSpacing("inc")}
      handleDecrement={() => handleDispatchSpacing("dec")}
      handleChange={handleLetterSpacingChange}
      min={EDITOR_DEFAULT_VALUES.LETTER_SPACING.MIN}
      max={EDITOR_DEFAULT_VALUES.LETTER_SPACING.MAX}
      step="0.01"
      AfterComponent={() => (
        <ResetToGlobalStyle
          disabled={!haveCustomStyle}
          handleReset={() => handleReset("letterSpacing")}
        />
      )}
    />
  );
};

export default LetterSpacingProperty;
