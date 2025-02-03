"use client";

import React, { useEffect, useMemo } from "react";
import BorderRadiusBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/BorderRadiusBlock";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import {
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

  const handleChangeBorderRadius = (
    borderRadius: Partial<Record<BorderRadiusType, number | "inc" | "dec">>
  ) => {
    dispatch(
      updateBorderRadiusStyle({
        blogId,
        activeBlockId: activeBlock,
        borderRadius,
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
      handleChange={handleChangeBorderRadius}
      handleToggleMore={handleToggleMore}
    />
  );
};

export default BorderRadiusProperty;
