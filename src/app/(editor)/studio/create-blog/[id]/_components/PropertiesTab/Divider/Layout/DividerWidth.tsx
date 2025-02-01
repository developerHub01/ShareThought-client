"use client";

import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import SliderBlockWithLabel from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/SliderBlockWithLabel";
import { addSingularSimpleStyle } from "@/redux/features/builders/blogBuilderSlice";

const DividerWidth = () => {
  const dispatch = useAppDispatch();
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return null;

  const {
    activeBlock,
    metaData: { styles = {} },
  } = useAppSelector((state) => state.blogBuilder.blogs[blogId as string]);

  if (!activeBlock) return null;

  const activeBlockStyles = styles[activeBlock];

  const handleChange = (value: number) => {
    dispatch(
      addSingularSimpleStyle({
        blogId,
        activeBlockId: activeBlock,
        styles: {
          width: value,
        },
      })
    );
  };

  return (
    <SliderBlockWithLabel
      label="Width"
      value={Number(activeBlockStyles.width ?? 100)}
      defaultValue={100}
      min={0}
      max={100}
      unit="%"
      onChange={handleChange}
    />
  );
};

export default DividerWidth;
