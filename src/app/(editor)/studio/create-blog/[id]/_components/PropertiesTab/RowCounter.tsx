"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import {
  addTableRows,
  changeTableRowsCount,
  removeTableRows,
  TableInterface,
} from "@/redux/features/builders/blogBuilderSlice";
import { EDITOR_TABLE_SIZE } from "@/constant";
import CountBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/CountBlock";

const RowCounter = () => {
  const dispatch = useAppDispatch();
  const { id: blogId } = useParams() as { id: string };

  if (!blogId) return null;

  const { activeBlock, content, components } = useAppSelector(
    (state) => state.blogBuilder.blogs[blogId as string]
  );

  if (!activeBlock) return null;

  const tableData = components[activeBlock as string]
    ?.children as TableInterface;

  const rowsCount = tableData?.tbody?.length;

  const [tableRowsCount, setTableRowsCount] = useState(rowsCount);

  useEffect(() => {
    if (content) setTableRowsCount(rowsCount);
  }, [content]);

  /* Rows handlers =========== */
  const handleRowsIncrement = () => {
    if (tableRowsCount >= EDITOR_TABLE_SIZE.MAX_ROWS) return;

    setTableRowsCount(tableRowsCount + 1);

    dispatch(
      addTableRows({
        blogId,
        id: activeBlock,
      })
    );
  };

  const handleRowsDecrement = () => {
    setTableRowsCount(Math.max(EDITOR_TABLE_SIZE.MIN_ROWS, tableRowsCount - 1));

    dispatch(
      removeTableRows({
        blogId,
        id: activeBlock,
      })
    );
  };

  const handleRowsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    const rowsCount =
      value < EDITOR_TABLE_SIZE.MIN_ROWS
        ? EDITOR_TABLE_SIZE.MIN_ROWS
        : value > EDITOR_TABLE_SIZE.MAX_ROWS
        ? EDITOR_TABLE_SIZE.MAX_ROWS
        : value;

    setTableRowsCount(rowsCount);

    dispatch(
      changeTableRowsCount({
        blogId,
        id: activeBlock,
        value: rowsCount,
      })
    );
  };

  return (
    <CountBlock
      title="Rows"
      value={tableRowsCount}
      handleIncrement={handleRowsIncrement}
      handleDecrement={handleRowsDecrement}
      handleChange={handleRowsChange}
      min={0}
    />
  );
};

export default RowCounter;
