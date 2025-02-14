"use client";

import React, { CSSProperties } from "react";
import SelectBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/SelectBlock";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import { addStyle } from "@/redux/features/builders/blogBuilderSlice";

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

const TypographyStyleFontWeight = () => {
  const dispatch = useAppDispatch();
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return null;

  const {
    activeBlock,
    metaData: { styles },
  } = useAppSelector((state) => state.blogBuilder.blogs[blogId]);

  if (!activeBlock) return null;

  const activeStyle = styles[activeBlock] as CSSProperties;

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

export default TypographyStyleFontWeight;
