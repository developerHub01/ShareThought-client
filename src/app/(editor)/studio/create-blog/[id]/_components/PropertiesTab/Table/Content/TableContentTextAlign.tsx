"use client";

import React, { memo } from "react";
import TextAlignBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/TextAlignBlock";
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from "@/lib/icons";
import {
  AlignType,
  changeTableContentStyle,
  TableInterface,
} from "@/redux/features/builders/blogBuilderSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import {
  selectBlogActiveBlock,
  selectBlogComponentById,
} from "@/redux/features/builders/selectors";

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

const TableContentTextAlign = memo(() => {
  const dispatch = useAppDispatch();
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return null;

  const activeBlock = useAppSelector((state) =>
    selectBlogActiveBlock(state, blogId)
  );
  const component = useAppSelector((state) =>
    selectBlogComponentById(state, blogId, activeBlock)
  );

  if (!activeBlock || !component) return null;

  const tableData = component?.children as TableInterface;

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
});

export default TableContentTextAlign;
