"use client";

import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import SliderBlockWithLabel from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/SliderBlockWithLabel";
import { updateOpacity } from "@/redux/features/builders/blogBuilderSlice";

const OpacityProperty = () => {
  const dispatch = useAppDispatch();
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return null;

  const {
    activeBlock,
    metaData: { styles = {} },
  } = useAppSelector((state) => state.blogBuilder.blogs[blogId]);

  if (!activeBlock) return null;

  const componentStyles = styles?.[activeBlock] ?? {};

  const handleChange = (value: number) => {
    dispatch(
      updateOpacity({
        blogId,
        activeBlockId: activeBlock,
        opacity: value,
      })
    );
  };

  return (
    <SliderBlockWithLabel
      label="Opacity"
      value={Number(componentStyles.opacity ?? 1) * 100}
      onChange={handleChange}
    />
  );
};

export default OpacityProperty;
