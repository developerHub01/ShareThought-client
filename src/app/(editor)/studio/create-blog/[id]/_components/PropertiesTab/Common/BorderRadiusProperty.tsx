"use client";

import React, { useEffect, useMemo, memo } from "react";
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
import {
  selectBlogActiveBlock,
  selectBlogMobileStylesById,
  selectBlogScreenType,
  selectBlogStylesById,
} from "@/redux/features/builders/selectors";

const BorderRadiusProperty = memo(() => {
  const dispatch = useAppDispatch();
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return null;

  const activeBlock = useAppSelector((state) =>
    selectBlogActiveBlock(state, blogId)
  );
  const screenType = useAppSelector((state) =>
    selectBlogScreenType(state, blogId)
  );
  const styles = useAppSelector((state) =>
    selectBlogStylesById(state, blogId, activeBlock)
  );
  const mobileStyles = useAppSelector((state) =>
    selectBlogMobileStylesById(state, blogId, activeBlock)
  );

  useEffect(() => {
    if (activeBlock)
      dispatch(
        createActiveBlockStyle({
          blogId,
          activeBlockId: activeBlock,
        })
      );
  }, [activeBlock, dispatch, blogId]);

  const activeStyle = useMemo(() => {
    if (!activeBlock || !styles) return {};

    return {
      ...filterStyle(styles, "Radius"),
      ...(screenType === "mobile" ? filterStyle(mobileStyles, "Radius") : {}),
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
      borderRadius={activeStyle as Partial<Record<BorderRadiusType, number>>}
      handleChange={handleChange}
      handleToggleMore={handleToggleMore}
    />
  );
});

export default BorderRadiusProperty;
