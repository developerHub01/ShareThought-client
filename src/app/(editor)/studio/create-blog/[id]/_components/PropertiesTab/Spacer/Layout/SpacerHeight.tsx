"use client";

import React, { ChangeEvent } from "react";
import CountBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/CountBlock";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import { changeSpacerSize } from "@/redux/features/builders/blogBuilderSlice";

const SpacerHeight = () => {
  const dispatch = useAppDispatch();
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return null;

  const {
    activeBlock,
    metaData: { styles = {} },
  } = useAppSelector((state) => state.blogBuilder.blogs[blogId as string]);

  if (!activeBlock) return null;

  const activeBlockStyles = styles[activeBlock];
  const spacerSize = Number(activeBlockStyles.height ?? 1);

  const handleSpacerSizeIncrement = () => {
    dispatch(
      changeSpacerSize({
        blogId,
        id: activeBlock,
        height: spacerSize + 1,
      })
    );
  };

  const handleSpacerSizeDecrement = () => {
    dispatch(
      changeSpacerSize({
        blogId,
        id: activeBlock,
        height: Math.max(spacerSize - 1, 1),
      })
    );
  };

  const handleSpacerSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    dispatch(
      changeSpacerSize({
        blogId,
        id: activeBlock,
        height: Math.max(value, 1),
      })
    );
  };

  return (
    <CountBlock
      label="Height"
      value={spacerSize}
      handleChange={handleSpacerSizeChange}
      handleIncrement={handleSpacerSizeIncrement}
      handleDecrement={handleSpacerSizeDecrement}
    />
  );
};

export default SpacerHeight;
