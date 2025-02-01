"use client";

import React, { ChangeEvent } from "react";
import CountBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/CountBlock";
import { EDITOR_TABLE_SIZE } from "@/constant";
import {
  changeTableHeaderStyle,
  TableInterface,
} from "@/redux/features/builders/blogBuilderSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";

const TableHeaderFontSize = () => {
  const dispatch = useAppDispatch();
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return null;

  const { activeBlock, content, components } = useAppSelector(
    (state) => state.blogBuilder.blogs[blogId as string]
  );

  if (!activeBlock) return null;

  const tableData = components[activeBlock as string]
    ?.children as TableInterface;

  const tableHeader = tableData.header;

  /* Columns handlers =========== */
  const handleFontSizeIncrement = () => {
    dispatch(
      changeTableHeaderStyle({
        blogId,
        id: activeBlock,
        fontSize: "inc",
      })
    );
  };

  const handleFontSizeDecrement = () => {
    dispatch(
      changeTableHeaderStyle({
        blogId,
        id: activeBlock,
        fontSize: "dec",
      })
    );
  };

  const handleFontSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    /* if columns count is 0 or less then 1 and if greater then 8 then max value 8 */
    const fontSize =
      value < EDITOR_TABLE_SIZE.MIN_HEADER_FONT_SIZE
        ? EDITOR_TABLE_SIZE.MIN_HEADER_FONT_SIZE
        : value > EDITOR_TABLE_SIZE.MAX_HEADER_FONT_SIZE
        ? EDITOR_TABLE_SIZE.MAX_HEADER_FONT_SIZE
        : value;

    dispatch(
      changeTableHeaderStyle({
        blogId,
        id: activeBlock,
        fontSize: fontSize,
      })
    );
  };

  return (
    <CountBlock
      label="Font Size"
      value={
        tableHeader?.fontSize || EDITOR_TABLE_SIZE.DEFAULT_HEADER_FONT_SIZE
      }
      handleIncrement={handleFontSizeIncrement}
      handleDecrement={handleFontSizeDecrement}
      handleChange={handleFontSizeChange}
      min={EDITOR_TABLE_SIZE.MIN_HEADER_FONT_SIZE}
      max={EDITOR_TABLE_SIZE.MAX_HEADER_FONT_SIZE}
    />
  );
};

export default TableHeaderFontSize;
