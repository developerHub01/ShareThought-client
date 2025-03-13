"use client";

import React, { ChangeEvent, useCallback, useMemo } from "react";
import CountBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/CountBlock";
import { addStyle } from "@/redux/features/builders/blogBuilderSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import { EDITOR_DEFAULT_VALUES } from "@/constant";
import useActiveStylePropertyTab from "@/hooks/editor/use-active-style-property-tab";
import ResetToGlobalStyle from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/ResetToGlobalStyle";
import useRemoveStyle from "@/hooks/editor/use-remove-style";

const FontSizeProperty = () => {
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

  console.log("Re-run fontsize property===========");

  if (!activeBlock) return null;

  const { type } = components[activeBlock];

  const haveCustomStyle = useMemo(
    () => "fontSize" in styles[activeBlock],
    [activeBlock, styles]
  );

  const activeStyle = useActiveStylePropertyTab({
    type,
    globalStyles,
    activeBlock,
    styles,
    mobileStyles,
    screenType,
    propertyName: "fontSize",
  });

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
};

export default FontSizeProperty;
