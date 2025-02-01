"use client";

import React from "react";
import SelectBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/SelectBlock";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import {
  changeTableContentStyle,
  LineHeightType,
  TableInterface,
} from "@/redux/features/builders/blogBuilderSlice";

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

const TableContentLineHeight = () => {
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

  const handleChangeLineHeight = (value: string) => {
    dispatch(
      changeTableContentStyle({
        blogId,
        id: activeBlock,
        lineHeight: Number(value) as LineHeightType,
      })
    );
  };

  return (
    <SelectBlock
      title="Line Weight"
      activeValue={tableContent?.lineHeight?.toString() || lineHeightList[0].id}
      itemList={lineHeightList}
      handleChange={handleChangeLineHeight}
    />
  );
};

export default TableContentLineHeight;
