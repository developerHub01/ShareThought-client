"use client";

import React from "react";
import {
  addImageFilter,
  ImageFiltersInitial,
} from "@/redux/features/builders/blogBuilderSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import SliderBlockWithLabel from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/SliderBlockWithLabel";

const ImageBlur = () => {
  const { id: blogId } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  if (!blogId) return null;

  const {
    activeBlock,
    metaData: { styles },
  } = useAppSelector((state) => state.blogBuilder.blogs[blogId as string]);

  if (!activeBlock) return null;

  const activeStyles = styles[activeBlock];

  const imageBlur = (activeStyles?.filter?.blur ??
    ImageFiltersInitial.blur) as number;

  const handleChange = (value: number) => {
    dispatch(
      addImageFilter({
        blogId,
        id: activeBlock,
        filter: {
          blur: value,
        },
      })
    );
  };

  return (
    <SliderBlockWithLabel
      label="Blur"
      unit="px"
      defaultValue={0}
      min={0}
      max={20}
      value={imageBlur}
      onChange={handleChange}
    />
  );
};

export default ImageBlur;
