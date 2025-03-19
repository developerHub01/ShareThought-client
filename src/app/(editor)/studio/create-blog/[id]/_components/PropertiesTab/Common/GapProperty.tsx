"use client";

import React, { ChangeEvent, useCallback, memo } from "react";
import CountBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/CountBlock";
import { addStyle } from "@/redux/features/builders/blogBuilderSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import { EDITOR_DEFAULT_VALUES } from "@/constant";
import useActiveStylePropertyTab from "@/hooks/editor/use-active-style-property-tab";
import {
  selectBlogActiveBlock,
  selectBlogComponentById,
  selectBlogGlobalStyle,
  selectBlogMobileStylesById,
  selectBlogScreenType,
  selectBlogStylesById,
} from "@/redux/features/builders/selectors";

const GapProperty = memo(() => {
  const dispatch = useAppDispatch();
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return null;

  const activeBlock = useAppSelector((state) =>
    selectBlogActiveBlock(state, blogId)
  );
  const screenType = useAppSelector((state) =>
    selectBlogScreenType(state, blogId)
  );
  const activeComponent = useAppSelector((state) =>
    selectBlogComponentById(state, blogId, activeBlock)
  );
  const globalStyles = useAppSelector((state) =>
    selectBlogGlobalStyle(state, blogId)
  );
  const styles = useAppSelector((state) =>
    selectBlogStylesById(state, blogId, activeBlock)
  );
  const mobileStyles = useAppSelector((state) =>
    selectBlogMobileStylesById(state, blogId, activeBlock)
  );

  if (!activeBlock || !activeComponent) return null;

  const { type } = activeComponent;

  const activeStyle = useActiveStylePropertyTab({
    type,
    globalStyles,
    styles,
    mobileStyles,
    screenType,
    propertyName: "gap",
  });

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
            gap: EDITOR_DEFAULT_VALUES.GAP.DEFAULT,
          },
          minStyles: {
            gap: EDITOR_DEFAULT_VALUES.GAP.MIN,
          },
          maxStyles: {
            gap: EDITOR_DEFAULT_VALUES.GAP.MAX,
          },
        })
      );
    },
    [blogId, activeBlock, type]
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(
      Math.max(Number(e.target.value), EDITOR_DEFAULT_VALUES.GAP.MIN),
      EDITOR_DEFAULT_VALUES.GAP.MAX
    );

    handleDispatchSize(value);
  };

  console.log("GapProperty ===========")

  return (
    <CountBlock
      label="Gap"
      value={Number(activeStyle?.gap) || EDITOR_DEFAULT_VALUES.GAP.DEFAULT}
      handleIncrement={() => handleDispatchSize("inc")}
      handleDecrement={() => handleDispatchSize("dec")}
      handleChange={handleChange}
      min={EDITOR_DEFAULT_VALUES.GAP.MIN}
      max={EDITOR_DEFAULT_VALUES.GAP.MAX}
    />
  );
});

export default GapProperty;
