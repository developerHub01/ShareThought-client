"use client";

import React, { useEffect, useMemo } from "react";
import BorderRadiusBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/BorderRadiusBlock";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import {
  addStyle,
  BorderRadiusType,
  createActiveBlockStyle,
  toggleBorderRadiusAll,
  updateBorderRadiusStyle,
} from "@/redux/features/builders/blogBuilderSlice";

const BorderRadiusProperty = () => {
  const dispatch = useAppDispatch();
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return null;

  const {
    activeBlock,
    metaData: { styles = {} },
  } = useAppSelector((state) => state.blogBuilder.blogs[blogId]);

  useEffect(() => {
    if (activeBlock && !styles[activeBlock])
      dispatch(
        createActiveBlockStyle({
          blogId,
          activeBlockId: activeBlock,
        })
      );
  }, [activeBlock, styles, dispatch, blogId]);

  const borderRadius = useMemo(() => {
    if (!activeBlock || !styles[activeBlock]) return {};

    return Object.fromEntries(
      Object.entries(styles[activeBlock]).filter(
        ([key, value]) => key.includes("Radius") && value !== undefined
      )
    ) as Record<BorderRadiusType, number>;
  }, [styles, activeBlock]);

  if (!activeBlock) return null;

  const handleChange = (
    borderRadius: Partial<Record<BorderRadiusType, number | "inc" | "dec">>
  ) => {
    dispatch(
      addStyle({
        blogId,
        activeBlockId: activeBlock,
        styles: borderRadius,
      })
    );
  };

  const handleToggleMore = () => {
    dispatch(
      toggleBorderRadiusAll({
        blogId,
        activeBlockId: activeBlock,
      })
    );
  };

  return (
    <BorderRadiusBlock
      borderRadius={borderRadius}
      handleChange={handleChange}
      handleToggleMore={handleToggleMore}
    />
  );
};

export default BorderRadiusProperty;
