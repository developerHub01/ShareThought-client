"use client";

import React from "react";
import SliderBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/SliderBlock";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addImageFilter,
  ImageFiltersInitial,
} from "@/redux/features/builders/blogBuilderSlice";

const ImageOpacity = () => {
  const { id: blogId } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  if (!blogId) return null;

  const {
    activeBlock,
    metaData: { styles },
  } = useAppSelector((state) => state.blogBuilder.blogs[blogId as string]);

  if (!activeBlock) return null;

  const activeStyles = styles[activeBlock];

  const imageOpacity = (activeStyles?.filter?.opacity ??
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
    <SliderBlock
      label="Opacity"
      min={0}
      max={100}
      defaultValue={100}
      value={imageOpacity}
      onChange={handleChange}
    />
  );
};

export default ImageOpacity;
