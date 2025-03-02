"use client";

import React, { CSSProperties, useEffect, useMemo } from "react";
import BorderRadiusBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/BorderRadiusBlock";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import {
  addStyle,
  BorderRadiusType,
  createActiveBlockStyle,
  toggleBorderRadiusAll,
} from "@/redux/features/builders/blogBuilderSlice";
import filterStyle from "@/utils/editor/filterStyle";

const BorderRadiusProperty = () => {
  const dispatch = useAppDispatch();
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return null;

  const {
    activeBlock,
    screenType,
    metaData: { styles = {}, mobileStyles = {} },
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

  const activeStyle = useMemo(() => {
    if (!activeBlock || !styles[activeBlock]) return {};

    return {
      ...filterStyle(styles[activeBlock], "Radius"),
      ...(screenType === "mobile"
        ? filterStyle(mobileStyles[activeBlock], "Radius")
        : {}),
    };
  }, [styles, mobileStyles, activeBlock, screenType]);

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
      borderRadius={activeStyle}
      handleChange={handleChange}
      handleToggleMore={handleToggleMore}
    />
  );
};

export default BorderRadiusProperty;
