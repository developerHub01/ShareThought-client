"use client";

import React, { ChangeEvent, memo } from "react";
import CountBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/CountBlock";
import { EDITOR_TABLE_SIZE } from "@/constant";
import {
  changeTableContentStyle,
  TableInterface,
} from "@/redux/features/builders/blogBuilderSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import {
  selectBlogActiveBlock,
  selectBlogComponentById,
} from "@/redux/features/builders/selectors";

const TableContentLetterSpacing = memo(() => {
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

  /* Columns content =========== */
  const handleLetterSpacingIncrement = () => {
    dispatch(
      changeTableContentStyle({
        blogId,
        id: activeBlock,
        letterSpacing: "inc",
      })
    );
  };

  const handleLetterSpacingDecrement = () => {
    dispatch(
      changeTableContentStyle({
        blogId,
        id: activeBlock,
        letterSpacing: "dec",
      })
    );
  };

  const handleLetterSpacingChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    /* if columns count is 0 or less then 1 and if greater then 8 then max value 8 */
    const letterSpacing =
      value < EDITOR_TABLE_SIZE.MIN_CONTENT_LETTER_SPACING
        ? EDITOR_TABLE_SIZE.MIN_CONTENT_LETTER_SPACING
        : value > EDITOR_TABLE_SIZE.MAX_CONTENT_LETTER_SPACING
        ? EDITOR_TABLE_SIZE.MAX_CONTENT_LETTER_SPACING
        : value;

    dispatch(
      changeTableContentStyle({
        blogId,
        id: activeBlock,
        letterSpacing: letterSpacing,
      })
    );
  };

  return (
    <CountBlock
      label="Letter Spacing"
      value={
        tableContent?.letterSpacing ||
        EDITOR_TABLE_SIZE.DEFAULT_CONTENT_LETTER_SPACING
      }
      handleIncrement={handleLetterSpacingIncrement}
      handleDecrement={handleLetterSpacingDecrement}
      handleChange={handleLetterSpacingChange}
      min={EDITOR_TABLE_SIZE.MIN_CONTENT_LETTER_SPACING}
      max={EDITOR_TABLE_SIZE.MAX_CONTENT_LETTER_SPACING}
    />
  );
});

export default TableContentLetterSpacing;
