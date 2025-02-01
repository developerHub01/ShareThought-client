"use client";

import React, { useEffect, useMemo } from "react";
import PaddingBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/PaddingBlock";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import {
  createActiveBlockStyle,
  PaddingType,
  togglePaddingAll,
  updatePaddingStyle,
} from "@/redux/features/builders/blogBuilderSlice";

const PaddingProperty = () => {
  const dispatch = useAppDispatch();
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return null;

  const {
    activeBlock,
    metaData: { styles = {} },
  } = useAppSelector((state) => state.blogBuilder.blogs[blogId]);

  if (!activeBlock) return null;

  useEffect(() => {
    if (activeBlock && !styles[activeBlock])
      dispatch(
        createActiveBlockStyle({
          blogId,
          activeBlockId: activeBlock,
        })
      );
  }, [activeBlock, dispatch, blogId, styles]);

  const padding = useMemo(() => {
    const activeStyles = styles[activeBlock] ?? {};
    return Object.fromEntries(
      Object.entries(activeStyles).filter(
        ([key, value]) => key.includes("padding") && value !== undefined
      )
    ) as Record<string, number>;
  }, [styles, activeBlock]);

  const handleChangePadding = (
    padding: Partial<Record<PaddingType, number | "inc" | "dec">>
  ) => {
    dispatch(
      updatePaddingStyle({
        blogId,
        activeBlockId: activeBlock,
        padding,
      })
    );
  };

  const handleToggleMore = () => {
    dispatch(
      togglePaddingAll({
        blogId,
        activeBlockId: activeBlock,
      })
    );
  };

  return (
    <PaddingBlock
      padding={padding}
      handleChange={handleChangePadding}
      handleToggleMore={handleToggleMore}
    />
  );
};

export default PaddingProperty;
