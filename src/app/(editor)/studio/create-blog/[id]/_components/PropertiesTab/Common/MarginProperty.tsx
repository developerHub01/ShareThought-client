"use client";

import React, { useEffect, memo } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import {
  addStyle,
  createActiveBlockStyle,
  MarginType,
} from "@/redux/features/builders/blogBuilderSlice";
import MarginBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/MarginBlock";
import { EDITOR_DEFAULT_VALUES } from "@/constant";
import useActiveStylePropertyTab from "@/hooks/editor/use-active-style-property-tab";
import {
  selectBlogActiveBlock,
  selectBlogComponentById,
  selectBlogGlobalStyle,
  selectBlogMobileStylesById,
  selectBlogScreenType,
  selectBlogStylesById,
} from "@/redux/features/builders/selectors";

const marginStyleConstraints = {
  defaultStyles: {
    marginTop: EDITOR_DEFAULT_VALUES.MARGIN.DEFAULT.default.marginTop,
    marginBottom: EDITOR_DEFAULT_VALUES.MARGIN.DEFAULT.default.marginTop,
  },
  minStyles: {
    marginTop: EDITOR_DEFAULT_VALUES.MARGIN.MIN,
    marginBottom: EDITOR_DEFAULT_VALUES.MARGIN.MIN,
  },
  maxStyles: {
    marginTop: EDITOR_DEFAULT_VALUES.MARGIN.MAX,
    marginBottom: EDITOR_DEFAULT_VALUES.MARGIN.MAX,
  },
};

interface MarginPropertyProps {
  label?: string;
}

const MarginProperty = memo(({ label }: MarginPropertyProps) => {
  const dispatch = useAppDispatch();
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return null;

  const activeBlock = useAppSelector((state) =>
    selectBlogActiveBlock(state, blogId)
  );
  const screenType = useAppSelector((state) =>
    selectBlogScreenType(state, blogId)
  );
  const activeComponent = useAppSelector((state) =>
    selectBlogComponentById(state, blogId, activeBlock)
  );
  const globalStyles = useAppSelector((state) =>
    selectBlogGlobalStyle(state, blogId)
  );
  const styles = useAppSelector((state) =>
    selectBlogStylesById(state, blogId, activeBlock)
  );
  const mobileStyles = useAppSelector((state) =>
    selectBlogMobileStylesById(state, blogId, activeBlock)
  );

  useEffect(() => {
    if (activeBlock && !styles[activeBlock])
      dispatch(
        createActiveBlockStyle({
          blogId,
          activeBlockId: activeBlock,
        })
      );
  }, [activeBlock, dispatch, blogId, styles]);

  if (!activeBlock || !activeComponent) return null;

  const { type } = activeComponent;

  const activeStyle = useActiveStylePropertyTab({
    globalStyles,
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
      margin={activeStyle as Partial<Record<MarginType, number>>}
      handleChange={handleChange}
    />
  );
});

export default MarginProperty;
