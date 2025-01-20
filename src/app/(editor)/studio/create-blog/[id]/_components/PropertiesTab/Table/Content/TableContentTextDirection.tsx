"use client";

import React from "react";
import TextAlignBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/TextAlignBlock";
import { PilcrowRight as LRTIcon, PilcrowLeft as RTLIcon } from "lucide-react";
import {
  changeTableContentStyle,
  TableInterface,
  TextDirectionType,
} from "@/redux/features/builders/blogBuilderSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";

const alignList = [
  {
    id: "ltr",
    label: "Left to Right",
    Icon: LRTIcon,
  },
  {
    id: "rtl",
    label: "Right to Left",
    Icon: RTLIcon,
  },
];

const TableContentTextDirection = () => {
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
        textDirection: value as TextDirectionType,
      })
    );
  };

  return (
    <TextAlignBlock
      title="Text Direction"
      activeAlign={tableContent?.align || alignList[0].id}
      handleChange={handleChangeAlign}
      alignList={alignList}
    />
  );
};

export default TableContentTextDirection;
