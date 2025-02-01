"use client";

import React from "react";
import TextAlignBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/TextAlignBlock";
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from "lucide-react";
import {
  AlignType,
  changeTableHeaderStyle,
  TableInterface,
} from "@/redux/features/builders/blogBuilderSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";

const alignList = [
  {
    id: "left",
    label: "Align Left",
    Icon: AlignLeft,
  },
  {
    id: "center",
    label: "Align Center",
    Icon: AlignCenter,
  },
  {
    id: "right",
    label: "Align Right",
    Icon: AlignRight,
  },
  {
    id: "justify",
    label: "Align Justify",
    Icon: AlignJustify,
  },
];

const TableHeaderTextAlign = () => {
  const dispatch = useAppDispatch();
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return null;

  const { activeBlock, components } = useAppSelector(
    (state) => state.blogBuilder.blogs[blogId as string]
  );

  if (!activeBlock) return null;

  const tableData = components[activeBlock as string]
    ?.children as TableInterface;

  const tableHeader = tableData.header;

  const handleChangeAlign = (value: string) => {
    dispatch(
      changeTableHeaderStyle({
        blogId,
        id: activeBlock,
        align: value as AlignType,
      })
    );
  };

  return (
    <TextAlignBlock
      title="Align"
      activeAlign={tableHeader?.align || (alignList[0].id as AlignType)}
      handleChange={handleChangeAlign}
      alignList={alignList}
    />
  );
};

export default TableHeaderTextAlign;
