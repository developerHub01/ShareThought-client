"use client";

import React, { ChangeEvent, useEffect, useState, memo } from "react";
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
import {
  selectBlogActiveBlock,
  selectBlogComponentById,
} from "@/redux/features/builders/selectors";

const TableRowCounter = memo(() => {
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

  if (!activeBlock) return null;

  const tableData = component?.children as TableInterface;

  const rowsCount = tableData?.tbody?.length;

  const [tableRowsCount, setTableRowsCount] = useState(rowsCount);

  useEffect(() => {
    setTableRowsCount(rowsCount);
  }, []);

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
      label="Rows"
      value={tableRowsCount}
      handleIncrement={handleRowsIncrement}
      handleDecrement={handleRowsDecrement}
      handleChange={handleRowsChange}
      min={0}
    />
  );
});

export default TableRowCounter;
