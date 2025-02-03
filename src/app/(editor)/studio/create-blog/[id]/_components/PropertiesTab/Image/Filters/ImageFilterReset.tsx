"use client";

import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { resetImageFilter } from "@/redux/features/builders/blogBuilderSlice";
import { useParams } from "next/navigation";
import ResetBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/ResetBlock";

const ImageFilterReset = () => {
  const { id: blogId } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  if (!blogId) return null;

  const {
    activeBlock,
    metaData: { styles },
  } = useAppSelector((state) => state.blogBuilder.blogs[blogId]);

  if (!activeBlock) return null;

  const activeStyles = styles[activeBlock];

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
      disabled={!activeStyles || !activeStyles.filter}
      handleResetFilters={handleResetFilters}
    />
  );
};

export default ImageFilterReset;
