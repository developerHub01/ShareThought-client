"use client";

import React, { ChangeEvent, useEffect, useState, memo } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import {
  addTableColumns,
  changeTableColumnsCount,
  removeTableColumns,
  TableInterface,
} from "@/redux/features/builders/blogBuilderSlice";
import { EDITOR_TABLE_SIZE } from "@/constant";
import CountBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/CountBlock";
import {
  selectBlogActiveBlock,
  selectBlogComponentById,
} from "@/redux/features/builders/selectors";

const TableColumnCounter = memo(() => {
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

  const columnsCount = tableData?.thead[0].length;

  const [tableColumnsCount, setTableColumnsCount] = useState(columnsCount);

  useEffect(() => {
    setTableColumnsCount(columnsCount);
  }, []);

  /* Columns handlers =========== */
  const handleColumnIncrement = () => {
    setTableColumnsCount(
      Math.min(EDITOR_TABLE_SIZE.MAX_COLUMNS, tableColumnsCount + 1)
    );

    dispatch(
      addTableColumns({
        blogId,
        id: activeBlock,
      })
    );
  };

  const handleColumnDecrement = () => {
    setTableColumnsCount(
      Math.max(EDITOR_TABLE_SIZE.MIN_COLUMNS, tableColumnsCount - 1)
    );

    dispatch(
      removeTableColumns({
        blogId,
        id: activeBlock,
      })
    );
  };

  const handleColumnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    /* if columns count is 0 or less then 1 and if greater then 8 then max value 8 */
    const columnsCount =
      value < EDITOR_TABLE_SIZE.MIN_COLUMNS
        ? EDITOR_TABLE_SIZE.MIN_COLUMNS
        : value > EDITOR_TABLE_SIZE.MAX_COLUMNS
        ? EDITOR_TABLE_SIZE.MAX_COLUMNS
        : value;

    setTableColumnsCount(columnsCount);

    dispatch(
      changeTableColumnsCount({
        blogId,
        id: activeBlock,
        value: columnsCount,
      })
    );
  };

  return (
    <CountBlock
      label="Columns"
      value={columnsCount}
      handleIncrement={handleColumnIncrement}
      handleDecrement={handleColumnDecrement}
      handleChange={handleColumnChange}
      min={EDITOR_TABLE_SIZE.MIN_COLUMNS}
      max={EDITOR_TABLE_SIZE.MAX_COLUMNS}
    />
  );
});

export default TableColumnCounter;
