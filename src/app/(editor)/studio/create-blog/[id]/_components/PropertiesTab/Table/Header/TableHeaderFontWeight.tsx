"use client";

import React from "react";
import SelectBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/SelectBlock";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import {
  changeTableHeaderStyle,
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

const TableHeaderFontWeight = () => {
  const dispatch = useAppDispatch();
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return null;

  const { activeBlock, components } = useAppSelector(
    (state) => state.blogBuilder.blogs[blogId]
  );

  if (!activeBlock) return null;

  const tableData = components[activeBlock as string]
    ?.children as TableInterface;

  const tableHeader = tableData.header;

  const handleChangeFontWeight = (value: string) => {
    dispatch(
      changeTableHeaderStyle({
        blogId,
        id: activeBlock,
        fontWeight: value as FontWeightType,
      })
    );
  };

  return (
    <SelectBlock
      title="Font Weight"
      activeValue={tableHeader?.fontWeight || fontWeightList[1].id}
      itemList={fontWeightList}
      handleChange={handleChangeFontWeight}
    />
  );
};

export default TableHeaderFontWeight;
