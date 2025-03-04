"use client";

import React, { useEffect } from "react";
import PaddingBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/PaddingBlock";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import {
  addStyle,
  createActiveBlockStyle,
  PaddingType,
  togglePaddingAll,
} from "@/redux/features/builders/blogBuilderSlice";
import { EDITOR_DEFAULT_VALUES } from "@/constant";
import useActiveStylePropertyTab from "@/hooks/editor/use-active-style-property-tab";

interface PaddingPropertyProps {
  label?: string;
}

const paddingStyleConstraints = {
  defaultStyles: {
    padding: EDITOR_DEFAULT_VALUES.PADDING.DEFAULT,
    paddingTop: EDITOR_DEFAULT_VALUES.PADDING.DEFAULT,
    paddingBottom: EDITOR_DEFAULT_VALUES.PADDING.DEFAULT,
    paddingLeft: EDITOR_DEFAULT_VALUES.PADDING.DEFAULT,
    paddingRight: EDITOR_DEFAULT_VALUES.PADDING.DEFAULT,
  },
  minStyles: {
    padding: EDITOR_DEFAULT_VALUES.PADDING.MIN,
    paddingTop: EDITOR_DEFAULT_VALUES.PADDING.MIN,
    paddingBottom: EDITOR_DEFAULT_VALUES.PADDING.MIN,
    paddingLeft: EDITOR_DEFAULT_VALUES.PADDING.MIN,
    paddingRight: EDITOR_DEFAULT_VALUES.PADDING.MIN,
  },
  maxStyles: {
    padding: EDITOR_DEFAULT_VALUES.PADDING.MAX,
    paddingTop: EDITOR_DEFAULT_VALUES.PADDING.MAX,
    paddingBottom: EDITOR_DEFAULT_VALUES.PADDING.MAX,
    paddingLeft: EDITOR_DEFAULT_VALUES.PADDING.MAX,
    paddingRight: EDITOR_DEFAULT_VALUES.PADDING.MAX,
  },
};

const PaddingProperty = ({ label }: PaddingPropertyProps) => {
  const dispatch = useAppDispatch();
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return null;

  const {
    activeBlock,
    screenType = "desktop",
    components,
    metaData: { styles = {}, mobileStyles = {}, globalStyles },
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

  const { type } = components[activeBlock];

  const activeStyle = useActiveStylePropertyTab({
    type,
    globalStyles,
    activeBlock,
    styles,
    mobileStyles,
    screenType,
    propertyName: "padding",
  });

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
      padding={activeStyle}
      handleChange={handleChange}
      handleToggleMore={handleToggleMore}
    />
  );
};

export default PaddingProperty;
