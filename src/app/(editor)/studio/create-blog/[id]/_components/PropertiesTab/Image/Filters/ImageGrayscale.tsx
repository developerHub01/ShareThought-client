"use client";

import React from "react";
import SliderBlockWithLabel from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/SliderBlockWithLabel";
import {
  addImageFilter,
  ImageFiltersInitial,
} from "@/redux/features/builders/blogBuilderSlice";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

const ImageGrayscale = () => {
  const { id: blogId } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  if (!blogId) return null;

  const {
    activeBlock,
    metaData: { styles },
  } = useAppSelector((state) => state.blogBuilder.blogs[blogId as string]);

  if (!activeBlock) return null;

  const activeStyles = styles[activeBlock];

  const imageGrayscale = (activeStyles?.filter?.grayscale ??
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
};

export default ImageGrayscale;
