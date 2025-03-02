"use client";

import React, { useEffect, useMemo } from "react";
import PaddingBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/PaddingBlock";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import {
  addStyle,
  createActiveBlockStyle,
  PaddingType,
  ScreenTypes,
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

    const desktop = filterStyle(activeStyles, "padding");

    const mobile = {
      ...desktop,
      ...filterStyle(activeMobileStyles, "padding"),
    };

    return {
      desktop,
      mobile,
    };
  }, [styles, mobileStyles, activeBlock]);

  const handleChange = (
    padding: Partial<Record<PaddingType, number | "inc" | "dec">>,
    screenType: ScreenTypes
  ) => {
    dispatch(
      addStyle({
        blogId,
        activeBlockId: activeBlock,
        screenType,
        styles: padding,
        ...paddingStyleConstraints,
      })
    );
  };

  const handleToggleMore = (screenType?: ScreenTypes) => {
    dispatch(
      togglePaddingAll({
        blogId,
        activeBlockId: activeBlock,
        screenType,
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
