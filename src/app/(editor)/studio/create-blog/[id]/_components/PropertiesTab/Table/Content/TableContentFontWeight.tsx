"use client";

import React from "react";
import SelectBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/SelectBlock";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import {
  changeTableContentStyle,
  FontWeightType,
  TableInterface,
} from "@/redux/features/builders/blogBuilderSlice";

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

const TableContentFontWeight = () => {
  const dispatch = useAppDispatch();
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return null;

  const { activeBlock, components } = useAppSelector(
    (state) => state.blogBuilder.blogs[blogId as string]
  );

  if (!activeBlock) return null;

  const tableData = components[activeBlock as string]
    ?.children as TableInterface;

  const tableContent = tableData.content;

  const handleChangeFontWeight = (value: string) => {
    dispatch(
      changeTableContentStyle({
        blogId,
        id: activeBlock,
        fontWeight: value as FontWeightType,
      })
    );
  };
  
  return (
    <SelectBlock
      title="Font Weight"
      activeValue={tableContent?.fontWeight || fontWeightList[0].id}
      itemList={fontWeightList}
      handleChange={handleChangeFontWeight}
    />
  );
};

export default TableContentFontWeight;
