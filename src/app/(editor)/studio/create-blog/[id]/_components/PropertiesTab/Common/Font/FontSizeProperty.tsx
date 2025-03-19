"use client";

import React, { ChangeEvent, memo, useCallback, useMemo } from "react";
import CountBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/CountBlock";
import { addStyle } from "@/redux/features/builders/blogBuilderSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import { EDITOR_DEFAULT_VALUES } from "@/constant";
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

const FontSizeProperty = memo(() => {
  const dispatch = useAppDispatch();
  const { id: blogId } = useParams<{ id: string }>();
  const handleReset = useRemoveStyle();

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

  const haveCustomStyle = useMemo(() => "fontSize" in styles, [styles]);

  const activeStyle = useActiveStylePropertyTab({
    type,
    globalStyles,
    styles,
    mobileStyles,
    screenType,
    propertyName: "fontSize",
  });

  if (!activeStyle) return null;

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
            fontSize: EDITOR_DEFAULT_VALUES.FONT_SIZE.DEFAULT[type],
          },
          minStyles: {
            fontSize: EDITOR_DEFAULT_VALUES.FONT_SIZE.MIN,
          },
          maxStyles: {
            fontSize: EDITOR_DEFAULT_VALUES.FONT_SIZE.MAX,
          },
        })
      );
    },
    [blogId, activeBlock, type]
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(
      Math.max(Number(e.target.value), EDITOR_DEFAULT_VALUES.FONT_SIZE.MIN),
      EDITOR_DEFAULT_VALUES.FONT_SIZE.MAX
    );

    handleDispatchSize(value);
  };

  return (
    <CountBlock
      label="Font Size"
      value={
        Number(activeStyle?.fontSize) ??
        EDITOR_DEFAULT_VALUES.FONT_SIZE.DEFAULT[type]
      }
      handleIncrement={() => handleDispatchSize("inc")}
      handleDecrement={() => handleDispatchSize("dec")}
      handleChange={handleChange}
      min={EDITOR_DEFAULT_VALUES.FONT_SIZE.MIN}
      max={EDITOR_DEFAULT_VALUES.FONT_SIZE.MAX}
      AfterComponent={() => (
        <ResetToGlobalStyle
          disabled={!haveCustomStyle}
          handleReset={() => handleReset("fontSize")}
        />
      )}
    />
  );
});

export default FontSizeProperty;
