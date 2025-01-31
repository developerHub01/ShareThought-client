"use client";

import React from "react";
import {
  addImageFilter,
  ImageFiltersInitial,
} from "@/redux/features/builders/blogBuilderSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import SliderBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/SliderBlock";

const ImageContrast = () => {
  const { id: blogId } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  if (!blogId) return null;

  const {
    activeBlock,
    metaData: { styles },
  } = useAppSelector((state) => state.blogBuilder.blogs[blogId as string]);

  if (!activeBlock) return null;

  const activeStyles = styles[activeBlock];

  const imageContrast = (activeStyles?.filter?.contrast ??
    ImageFiltersInitial.contrast) as number;

  const handleChange = (value: number) => {
    dispatch(
      addImageFilter({
        blogId,
        id: activeBlock,
        filter: {
          contrast: value,
        },
      })
    );
  };

  return (
    <SliderBlock
      label="Contrast"
      min={0}
      max={200}
      defaultValue={100}
      value={imageContrast}
      onChange={handleChange}
    />
  );
};

export default ImageContrast;
