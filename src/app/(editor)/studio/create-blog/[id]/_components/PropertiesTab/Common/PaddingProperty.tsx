"use client";

import React, { useEffect, useMemo } from "react";
import PaddingBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/PaddingBlock";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import {
  addStyle,
  createActiveBlockStyle,
  PaddingType,
  togglePaddingAll,
} from "@/redux/features/builders/blogBuilderSlice";
import { PADDING_MARGIN_LIMITS } from "@/constant";
import filterStyle from "@/utils/editor/filterStyle";

interface PaddingPropertyProps {
  label?: string;
}

const paddingStyleConstraints = {
  defaultStyles: {
    padding: PADDING_MARGIN_LIMITS.DEFAULT,
    paddingTop: PADDING_MARGIN_LIMITS.DEFAULT,
    paddingBottom: PADDING_MARGIN_LIMITS.DEFAULT,
    paddingLeft: PADDING_MARGIN_LIMITS.DEFAULT,
    paddingRight: PADDING_MARGIN_LIMITS.DEFAULT,
  },
  minStyles: {
    padding: PADDING_MARGIN_LIMITS.MIN.padding,
    paddingTop: PADDING_MARGIN_LIMITS.MIN.padding,
    paddingBottom: PADDING_MARGIN_LIMITS.MIN.padding,
    paddingLeft: PADDING_MARGIN_LIMITS.MIN.padding,
    paddingRight: PADDING_MARGIN_LIMITS.MIN.padding,
  },
  maxStyles: {
    padding: PADDING_MARGIN_LIMITS.MAX.padding,
    paddingTop: PADDING_MARGIN_LIMITS.MAX.padding,
    paddingBottom: PADDING_MARGIN_LIMITS.MAX.padding,
    paddingLeft: PADDING_MARGIN_LIMITS.MAX.padding,
    paddingRight: PADDING_MARGIN_LIMITS.MAX.padding,
  },
};

const PaddingProperty = ({ label }: PaddingPropertyProps) => {
  const dispatch = useAppDispatch();
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return null;

  const {
    activeBlock,
    screenType,
    metaData: { styles = {}, mobileStyles = {} },
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
    const activeMobileStyles = mobileStyles[activeBlock] ?? {};

    return {
      ...filterStyle(activeStyles, "padding"),
      ...(screenType === "mobile"
        ? filterStyle(activeMobileStyles, "padding")
        : {}),
    };
  }, [styles, screenType, mobileStyles, activeBlock]);

  const handleChange = (
    padding: Partial<Record<PaddingType, number | "inc" | "dec">>
  ) => {
    dispatch(
      addStyle({
        blogId,
        activeBlockId: activeBlock,
        styles: padding,
        ...paddingStyleConstraints,
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
      label={label}
      padding={padding}
      handleChange={handleChange}
      handleToggleMore={handleToggleMore}
    />
  );
};

export default PaddingProperty;
