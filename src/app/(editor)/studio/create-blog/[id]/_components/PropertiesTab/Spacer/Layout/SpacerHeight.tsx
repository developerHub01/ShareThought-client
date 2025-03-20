"use client";

import React, { ChangeEvent, useCallback, memo } from "react";
import CountBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/CountBlock";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import { addStyle } from "@/redux/features/builders/blogBuilderSlice";
import useActiveStylePropertyTab from "@/hooks/editor/use-active-style-property-tab";
import {
  selectBlogActiveBlock,
  selectBlogComponentById,
  selectBlogMobileStylesById,
  selectBlogScreenType,
  selectBlogStylesById,
} from "@/redux/features/builders/selectors";

const spacerHeightStyleConstraints = {
  defaultStyles: {
    height: 1,
  },
  minStyles: {
    height: 1,
  },
};

const SpacerHeight = memo(() => {
  const dispatch = useAppDispatch();
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return null;

  const activeBlock = useAppSelector((state) =>
    selectBlogActiveBlock(state, blogId)
  );
  const component = useAppSelector((state) =>
    selectBlogComponentById(state, blogId, activeBlock)
  );
  const styles = useAppSelector((state) =>
    selectBlogStylesById(state, blogId, activeBlock)
  );
  const mobileStyles = useAppSelector((state) =>
    selectBlogMobileStylesById(state, blogId, activeBlock)
  );
  const screenType = useAppSelector((state) =>
    selectBlogScreenType(state, blogId)
  );

  if (!activeBlock || !component) return null;

  const { type } = component;

  const activeStyle = useActiveStylePropertyTab({
    type,
    styles,
    mobileStyles,
    screenType,
    propertyName: "height",
  });

  const handleDispatch = useCallback(
    (height: number | "inc" | "dec") =>
      dispatch(
        addStyle({
          blogId,
          activeBlockId: activeBlock,
          styles: {
            height,
          },
          ...spacerHeightStyleConstraints,
        })
      ),
    [dispatch, blogId, activeBlock]
  );

  const handleSpacerSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const height = Number(e.target.value);
    handleDispatch(height);
  };

  return (
    <CountBlock
      label="Height"
      value={Number(activeStyle.height ?? 1)}
      handleChange={handleSpacerSizeChange}
      handleIncrement={() => handleDispatch("inc")}
      handleDecrement={() => handleDispatch("dec")}
    />
  );
});

export default SpacerHeight;
