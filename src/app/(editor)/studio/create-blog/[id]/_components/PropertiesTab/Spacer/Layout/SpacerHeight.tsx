"use client";

import React, { ChangeEvent, useMemo } from "react";
import CountBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/CountBlock";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import { addStyle } from "@/redux/features/builders/blogBuilderSlice";
import filterStyle from "@/utils/editor/filterStyle";

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
    metaData: { styles = {}, mobileStyles = {} },
  } = useAppSelector((state) => state.blogBuilder.blogs[blogId]);

  if (!activeBlock) return null;

  const activeStyle = useMemo(
    () => ({
      ...filterStyle(styles[activeBlock], "height"),
      ...(screenType === "mobile"
        ? filterStyle(mobileStyles[activeBlock], "height")
        : {}),
    }),
    [styles, mobileStyles, activeBlock, screenType]
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

    dispatch(
      addStyle({
        blogId,
        activeBlockId: activeBlock,
        styles: {
          height,
        },
        ...spacerHeightStyleConstraints,
      })
    );
  };

  return (
    <CountBlock
      label="Height"
      value={activeStyle.height ?? 1}
      handleChange={handleSpacerSizeChange}
      handleIncrement={handleSpacerSizeIncrement}
      handleDecrement={handleSpacerSizeDecrement}
    />
  );
};

export default SpacerHeight;
