"use client";

import React from "react";
import TextAlignBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/TextAlignBlock";
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from "lucide-react";
import {
  AlignType,
  changeTableContentStyle,
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

const TableContentTextAlign = () => {
  const dispatch = useAppDispatch();
  const { id: blogId } = useParams() as { id: string };

  if (!blogId) return null;

  const { activeBlock, components } = useAppSelector(
    (state) => state.blogBuilder.blogs[blogId as string]
  );

  if (!activeBlock) return null;

  const tableData = components[activeBlock as string]
    ?.children as TableInterface;

  const tableContent = tableData.content;

  const handleChangeAlign = (value: string) => {
    dispatch(
      changeTableContentStyle({
        blogId,
        id: activeBlock,
        align: value as AlignType,
      })
    );
  };

  return (
    <TextAlignBlock
      title="Align"
      activeAlign={tableContent?.align || (alignList[0].id as AlignType)}
      handleChange={handleChangeAlign}
      alignList={alignList}
    />
  );
};

export default TableContentTextAlign;
