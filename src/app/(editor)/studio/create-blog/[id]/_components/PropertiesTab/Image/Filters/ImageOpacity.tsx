"use client";

import React, { memo } from "react";
import SliderBlockWithLabel from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/SliderBlockWithLabel";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addImageFilter,
  ImageFiltersInitial,
} from "@/redux/features/builders/blogBuilderSlice";
import {
  selectBlogActiveBlock,
  selectBlogStylesById,
} from "@/redux/features/builders/selectors";

const ImageOpacity = memo(() => {
  const { id: blogId } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  if (!blogId) return null;

  const activeBlock = useAppSelector((state) =>
    selectBlogActiveBlock(state, blogId)
  );
  const styles = useAppSelector((state) =>
    selectBlogStylesById(state, blogId, activeBlock)
  );

  if (!activeBlock) return null;

  const imageOpacity = (styles?.filter?.opacity ??
    ImageFiltersInitial.opacity) as number;

  const handleChange = (value: number) => {
    dispatch(
      addImageFilter({
        blogId,
        id: activeBlock,
        filter: {
          opacity: value,
        },
      })
    );
  };

  return (
    <SliderBlockWithLabel
      label="Opacity"
      min={0}
      max={100}
      defaultValue={100}
      value={imageOpacity}
      onChange={handleChange}
    />
  );
});

export default ImageOpacity;
