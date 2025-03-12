"use client";

import { removeStyle } from "@/redux/features/builders/blogBuilderSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import { CSSProperties } from "react";

const useRemoveStyle = () => {
  const dispatch = useAppDispatch();
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return () => {};

  const { activeBlock } = useAppSelector(
    (state) => state.blogBuilder.blogs[blogId]
  );

  if (!activeBlock) return () => {};

  const handleReset = (properyName: keyof CSSProperties) => {
    dispatch(
      removeStyle({
        activeBlockId: activeBlock,
        blogId,
        properyName,
      })
    );
  };

  return handleReset;
};

export default useRemoveStyle;
