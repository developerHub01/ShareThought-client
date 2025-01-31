"use client";

import React from "react";
import SliderBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/SliderBlock";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addImageFilter,
  ImageFiltersInitial,
} from "@/redux/features/builders/blogBuilderSlice";

const ImageHueRotate = () => {
  const { id: blogId } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  if (!blogId) return null;

  const {
    activeBlock,
    metaData: { styles },
  } = useAppSelector((state) => state.blogBuilder.blogs[blogId as string]);

  if (!activeBlock) return null;

  const activeStyles = styles[activeBlock];

  const imageHueRotate = (activeStyles?.filter?.hueRotate ??
    ImageFiltersInitial.hueRotate) as number;

  const handleChange = (value: number) => {
    dispatch(
      addImageFilter({
        blogId,
        id: activeBlock,
        filter: {
          hueRotate: value,
        },
      })
    );
  };

  return (
    <SliderBlock
      label="Hue-rotate"
      unit="&deg;"
      min={0}
      max={360}
      defaultValue={0}
      value={imageHueRotate}
      onChange={handleChange}
    />
  );
};

export default ImageHueRotate;
