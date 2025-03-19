"use client";

import React, { ChangeEvent, memo, useCallback, useMemo } from "react";
import CountBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/CountBlock";
import { EDITOR_DEFAULT_VALUES } from "@/constant";
import { addStyle } from "@/redux/features/builders/blogBuilderSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import useActiveStylePropertyTab from "@/hooks/editor/use-active-style-property-tab";
import ResetToGlobalStyle from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/ResetToGlobalStyle";
import useRemoveStyle from "@/hooks/editor/use-remove-style";
import {
  selectBlogActiveBlock,
  selectBlogComponentById,
  selectBlogGlobalStyle,
  selectBlogMobileStylesById,
  selectBlogScreenType,
  selectBlogStylesById,
} from "@/redux/features/builders/selectors";

const LetterSpacingProperty = memo(() => {
  const dispatch = useAppDispatch();
  const { id: blogId } = useParams<{ id: string }>();
  const handleReset = useRemoveStyle();

  if (!blogId) return null;

  const activeBlock = useAppSelector((state) =>
    selectBlogActiveBlock(state, blogId)
  );
  const screenType = useAppSelector((state) =>
    selectBlogScreenType(state, blogId)
  );
  const globalStyles = useAppSelector((state) =>
    selectBlogGlobalStyle(state, blogId)
  );
  const styles =
    useAppSelector((state) =>
      selectBlogStylesById(state, blogId, activeBlock)
    ) ?? {};
  const mobileStyles =
    useAppSelector((state) =>
      selectBlogMobileStylesById(state, blogId, activeBlock)
    ) ?? {};
  const component = useAppSelector((state) =>
    selectBlogComponentById(state, blogId, activeBlock)
  );

  if (!blogId || !activeBlock || !component || !component.type) return null;

  const { type } = component;

  console.log("Re-run fontsize property===========");

  const haveCustomStyle = useMemo(() => "letterSpacing" in styles, [styles]);

  const activeStyle = useActiveStylePropertyTab({
    type,
    globalStyles,
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
});

export default LetterSpacingProperty;
