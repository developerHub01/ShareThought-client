"use client";

import React, { memo } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import SliderBlockWithLabel from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/SliderBlockWithLabel";
import { addStyle } from "@/redux/features/builders/blogBuilderSlice";
import {
  selectBlogActiveBlock,
  selectBlogStylesById,
} from "@/redux/features/builders/selectors";

const DividerWidth = memo(() => {
  const dispatch = useAppDispatch();
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return null;

  const activeBlock = useAppSelector((state) =>
    selectBlogActiveBlock(state, blogId)
  );
  const styles = useAppSelector((state) =>
    selectBlogStylesById(state, blogId, activeBlock)
  );

  if (!activeBlock) return null;

  const handleChange = (value: number) => {
    dispatch(
      addStyle({
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
      value={Number(styles.width ?? 100)}
      defaultValue={100}
      min={0}
      max={100}
      unit="%"
      onChange={handleChange}
    />
  );
});

export default DividerWidth;
