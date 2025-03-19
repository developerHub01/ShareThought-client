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

const ImageHueRotate = memo(() => {
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

  const imageHueRotate = (styles?.filter?.["hue-rotate"] ??
    ImageFiltersInitial["hue-rotate"]) as number;

  const handleChange = (value: number) => {
    dispatch(
      addImageFilter({
        blogId,
        id: activeBlock,
        filter: {
          "hue-rotate": value,
        },
      })
    );
  };

  return (
    <SliderBlockWithLabel
      label="Hue-rotate"
      unit="&deg;"
      min={0}
      max={360}
      defaultValue={0}
      value={imageHueRotate}
      onChange={handleChange}
    />
  );
});

export default ImageHueRotate;
