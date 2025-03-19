"use client";

import React, { memo } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { resetImageFilter } from "@/redux/features/builders/blogBuilderSlice";
import { useParams } from "next/navigation";
import ResetBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/ResetBlock";
import {
  selectBlogActiveBlock,
  selectBlogStylesById,
} from "@/redux/features/builders/selectors";

const ImageFilterReset = memo(() => {
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

  const handleResetFilters = () => {
    dispatch(
      resetImageFilter({
        blogId,
        id: activeBlock,
      })
    );
  };

  return (
    <ResetBlock
      lable="Reset filters"
      tooltip="Reset all filters"
      disabled={!styles || !styles.filter}
      handleResetFilters={handleResetFilters}
    />
  );
});

export default ImageFilterReset;
