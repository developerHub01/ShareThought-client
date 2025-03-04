"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import {
  addStyle,
  createActiveBlockStyle,
  MarginType,
} from "@/redux/features/builders/blogBuilderSlice";
import MarginBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/MarginBlock";
import { PADDING_MARGIN_LIMITS } from "@/constant";
import useActiveStylePropertyTab from "@/hooks/editor/use-active-style-property-tab";

const marginStyleConstraints = {
  defaultStyles: {
    marginTop: PADDING_MARGIN_LIMITS.DEFAULT,
    marginBottom: PADDING_MARGIN_LIMITS.DEFAULT,
  },
  minStyles: {
    marginTop: PADDING_MARGIN_LIMITS.MIN.margin,
    marginBottom: PADDING_MARGIN_LIMITS.MIN.margin,
  },
  maxStyles: {
    marginTop: PADDING_MARGIN_LIMITS.MAX.margin,
    marginBottom: PADDING_MARGIN_LIMITS.MAX.margin,
  },
};

interface MarginPropertyProps {
  label?: string;
}

const MarginProperty = ({ label }: MarginPropertyProps) => {
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
    globalStyles,
    activeBlock,
    type,
    styles,
    mobileStyles,
    screenType,
    propertyName: "margin",
  });

  const handleChange = (
    margin: Partial<Record<MarginType, number | "inc" | "dec">>
  ) => {
    dispatch(
      addStyle({
        blogId,
        activeBlockId: activeBlock,
        styles: margin,
        ...marginStyleConstraints,
      })
    );
  };

  return (
    <MarginBlock
      label={label}
      margin={activeStyle}
      handleChange={handleChange}
    />
  );
};

export default MarginProperty;
