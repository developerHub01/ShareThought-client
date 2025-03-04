"use client";

import React, { ChangeEvent, useCallback, useMemo } from "react";
import CountBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/CountBlock";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import { addStyle } from "@/redux/features/builders/blogBuilderSlice";
import filterStyle from "@/utils/editor/filterStyle";
import useActiveStylePropertyTab from "@/hooks/editor/use-active-style-property-tab";

const spacerHeightStyleConstraints = {
  defaultStyles: {
    height: 1,
  },
  minStyles: {
    height: 1,
  },
};

const SpacerHeight = () => {
  const dispatch = useAppDispatch();
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return null;

  const {
    activeBlock,
    screenType,
    components,
    metaData: { styles = {}, mobileStyles = {} },
  } = useAppSelector((state) => state.blogBuilder.blogs[blogId]);

  if (!activeBlock) return null;

  const { type } = components[activeBlock];

  const activeStyle = useActiveStylePropertyTab({
    type,
    activeBlock,
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

  const handleSpacerSizeIncrement = () => {
    dispatch(
      addStyle({
        blogId,
        activeBlockId: activeBlock,
        styles: {
          height: "inc",
        },
        ...spacerHeightStyleConstraints,
      })
    );
  };

  const handleSpacerSizeDecrement = () => {
    dispatch(
      addStyle({
        blogId,
        activeBlockId: activeBlock,
        styles: {
          height: "dec",
        },
        ...spacerHeightStyleConstraints,
      })
    );
  };

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
};

export default SpacerHeight;
