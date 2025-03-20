"use client";

import React, { memo } from "react";
import SelectBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/SelectBlock";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import {
  changeTableHeaderStyle,
  FontWeightType,
  TableInterface,
} from "@/redux/features/builders/blogBuilderSlice";
import {
  selectBlogActiveBlock,
  selectBlogComponentById,
} from "@/redux/features/builders/selectors";

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

const TableHeaderFontWeight = memo(() => {
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
      label="Font Weight"
      activeValue={tableHeader?.fontWeight || fontWeightList[1].id}
      itemList={fontWeightList}
      handleChange={handleChangeFontWeight}
    />
  );
});

export default TableHeaderFontWeight;
