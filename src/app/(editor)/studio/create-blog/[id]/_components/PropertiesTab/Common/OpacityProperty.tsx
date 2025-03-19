"use client";

import React, { memo } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import SliderBlockWithLabel from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/SliderBlockWithLabel";
import { updateOpacity } from "@/redux/features/builders/blogBuilderSlice";
import {
  selectBlogActiveBlock,
  selectBlogStylesById,
} from "@/redux/features/builders/selectors";

const OpacityProperty = memo(() => {
  const dispatch = useAppDispatch();
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return null;

  const activeBlock = useAppSelector((state) =>
    selectBlogActiveBlock(state, blogId)
  );
  const componentStyles = useAppSelector((state) =>
    selectBlogStylesById(state, blogId, activeBlock)
  );

  if (!activeBlock) return null;

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
});

export default OpacityProperty;
