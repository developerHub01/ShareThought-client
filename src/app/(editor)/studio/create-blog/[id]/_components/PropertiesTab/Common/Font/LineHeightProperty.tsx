"use client";

import React from "react";
import SelectBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/SelectBlock";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import {
  addStyle,
  LineHeightType,
} from "@/redux/features/builders/blogBuilderSlice";
import useActiveStylePropertyTab from "@/hooks/editor/use-active-style-property-tab";
import { EDITOR_DEFAULT_VALUES } from "@/constant";

const lineHeightList = [
  {
    id: "1.2",
    label: "1.2",
  },
  {
    id: "1.5",
    label: "1.5",
  },
  {
    id: "1.8",
    label: "1.8",
  },
  {
    id: "2",
    label: "2.0",
  },
];

const LineHeightProperty = () => {
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

  const { type } = components[activeBlock];

  const activeStyle = useActiveStylePropertyTab({
    type,
    globalStyles,
    activeBlock,
    styles,
    mobileStyles,
    screenType,
    propertyName: "lineHeight",
  });

  const handleChangeLineHeight = (value: string) => {
    dispatch(
      addStyle({
        blogId,
        activeBlockId: activeBlock,
        styles: {
          lineHeight: Number(value) as LineHeightType,
        },
      })
    );
  };

  return (
    <SelectBlock
      label="Line Height"
      activeValue={String(
        activeStyle?.lineHeight ??
          EDITOR_DEFAULT_VALUES.LINE_HEIGHT.DEFAULT[type]
      )}
      itemList={lineHeightList}
      handleChange={handleChangeLineHeight}
    />
  );
};

export default LineHeightProperty;
