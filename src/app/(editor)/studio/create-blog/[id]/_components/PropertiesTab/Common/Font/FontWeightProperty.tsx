"use client";

import React from "react";
import SelectBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/SelectBlock";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import { addStyle } from "@/redux/features/builders/blogBuilderSlice";
import useActiveStylePropertyTab from "@/hooks/editor/use-active-style-property-tab";

const fontWeightList = [
  {
    id: "normal",
    label: "Normal",
  },
  {
    id: "bold",
    label: "Bold",
  },
];

const FontWeightProperty = () => {
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
    propertyName: "fontWeight",
  });

  const handleChangeFontWeight = (value: string) => {
    dispatch(
      addStyle({
        blogId,
        activeBlockId: activeBlock,
        styles: {
          fontWeight: value,
        },
      })
    );
  };

  return (
    <SelectBlock
      label="Font Weight"
      activeValue={String(activeStyle?.fontWeight || fontWeightList[0].id)}
      itemList={fontWeightList}
      handleChange={handleChangeFontWeight}
    />
  );
};

export default FontWeightProperty;
