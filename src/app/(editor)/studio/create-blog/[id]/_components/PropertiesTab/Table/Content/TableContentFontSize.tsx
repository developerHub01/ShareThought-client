"use client";

import React, { ChangeEvent } from "react";
import CountBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/CountBlock";
import { EDITOR_TABLE_SIZE } from "@/constant";
import {
  changeTableContentStyle,
  TableInterface,
} from "@/redux/features/builders/blogBuilderSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";

const TableContentFontSize = () => {
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

  /* Columns handlers =========== */
  const handleFontSizeIncrement = () => {
    dispatch(
      changeTableContentStyle({
        blogId,
        id: activeBlock,
        fontSize: "inc",
      })
    );
  };

  const handleFontSizeDecrement = () => {
    dispatch(
      changeTableContentStyle({
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
      value < EDITOR_TABLE_SIZE.MIN_CONTENT_FONT_SIZE
        ? EDITOR_TABLE_SIZE.MIN_CONTENT_FONT_SIZE
        : value > EDITOR_TABLE_SIZE.MAX_CONTENT_FONT_SIZE
        ? EDITOR_TABLE_SIZE.MAX_CONTENT_FONT_SIZE
        : value;

    dispatch(
      changeTableContentStyle({
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
        tableContent?.fontSize || EDITOR_TABLE_SIZE.DEFAULT_CONTENT_FONT_SIZE
      }
      handleIncrement={handleFontSizeIncrement}
      handleDecrement={handleFontSizeDecrement}
      handleChange={handleFontSizeChange}
      min={EDITOR_TABLE_SIZE.MIN_CONTENT_FONT_SIZE}
      max={EDITOR_TABLE_SIZE.MAX_CONTENT_FONT_SIZE}
    />
  );
};

export default TableContentFontSize;
