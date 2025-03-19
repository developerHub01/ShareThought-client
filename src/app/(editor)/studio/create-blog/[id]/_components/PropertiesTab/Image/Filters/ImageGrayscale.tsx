"use client";

import React, { memo } from "react";
import SliderBlockWithLabel from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/SliderBlockWithLabel";
import {
  addImageFilter,
  ImageFiltersInitial,
} from "@/redux/features/builders/blogBuilderSlice";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  selectBlogActiveBlock,
  selectBlogStylesById,
} from "@/redux/features/builders/selectors";

const ImageGrayscale = memo(() => {
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

  const imageGrayscale = (styles?.filter?.grayscale ??
    ImageFiltersInitial.grayscale) as number;

  const handleChange = (value: number) => {
    dispatch(
      addImageFilter({
        blogId,
        id: activeBlock,
        filter: {
          grayscale: value,
        },
      })
    );
  };

  return (
    <SliderBlockWithLabel
      label="Grayscale"
      min={0}
      max={100}
      defaultValue={0}
      value={imageGrayscale}
      onChange={handleChange}
    />
  );
});

export default ImageGrayscale;
