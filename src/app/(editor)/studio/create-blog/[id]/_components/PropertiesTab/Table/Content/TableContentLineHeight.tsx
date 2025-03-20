"use client";

import React, { memo } from "react";
import SelectBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/SelectBlock";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import {
  changeTableContentStyle,
  LineHeightType,
  TableInterface,
} from "@/redux/features/builders/blogBuilderSlice";
import {
  selectBlogActiveBlock,
  selectBlogComponentById,
} from "@/redux/features/builders/selectors";

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

const TableContentLineHeight = memo(() => {
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
      label="Line Height"
      activeValue={String(tableContent?.lineHeight || lineHeightList[0].id)}
      itemList={lineHeightList}
      handleChange={handleChangeLineHeight}
    />
  );
});

export default TableContentLineHeight;
