"use client";

import React from "react";
import SliderBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/SliderBlock";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addImageFilter,
  ImageFiltersInitial,
} from "@/redux/features/builders/blogBuilderSlice";

const ImageInvert = () => {
  const { id: blogId } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  if (!blogId) return null;

  const {
    activeBlock,
    metaData: { styles },
  } = useAppSelector((state) => state.blogBuilder.blogs[blogId as string]);

  if (!activeBlock) return null;

  const activeStyles = styles[activeBlock];

  const imageInvert = (activeStyles?.filter?.invert ??
    ImageFiltersInitial.invert) as number;

  const handleChange = (value: number) => {
    dispatch(
      addImageFilter({
        blogId,
        id: activeBlock,
        filter: {
          invert: value,
        },
      })
    );
  };

  return (
    <SliderBlock
      label="Invert"
      min={0}
      max={100}
      defaultValue={0}
      value={imageInvert}
      onChange={handleChange}
    />
  );
};

export default ImageInvert;
