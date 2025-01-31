"use client";

import React from "react";
import SliderBlockWithLabel from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/SliderBlockWithLabel";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addImageFilter,
  ImageFiltersInitial,
} from "@/redux/features/builders/blogBuilderSlice";

const ImageBrightness = () => {
  const { id: blogId } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  if (!blogId) return null;

  const {
    activeBlock,
    metaData: { styles },
  } = useAppSelector((state) => state.blogBuilder.blogs[blogId as string]);

  if (!activeBlock) return null;

  const activeStyles = styles[activeBlock];

  const imageBrightness = (activeStyles?.filter?.brightness ??
    ImageFiltersInitial.brightness) as number;

  const handleChange = (value: number) => {
    dispatch(
      addImageFilter({
        blogId,
        id: activeBlock,
        filter: {
          brightness: value,
        },
      })
    );
  };

  return (
    <SliderBlockWithLabel
      label="Brightness"
      min={0}
      max={200}
      defaultValue={100}
      value={imageBrightness}
      onChange={handleChange}
    />
  );
};

export default ImageBrightness;
