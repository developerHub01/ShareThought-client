"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import ValueCounter from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/ValueCounter";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import {
  addTableColumns,
  changeTableColumnsCount,
  removeTableColumns,
  TableInterface,
} from "@/redux/features/builders/blogBuilderSlice";
import { EDITOR_TABLE_SIZE } from "@/constant";

const ColumnCounter = () => {
  const dispatch = useAppDispatch();
  const { id: blogId } = useParams() as { id: string };

  if (!blogId) return null;

  const { activeBlock, content, components } = useAppSelector(
    (state) => state.blogBuilder.blogs[blogId as string]
  );

  if (!activeBlock) return null;

  const tableData = components[activeBlock as string]
    ?.children as TableInterface;

  const columnsCount = tableData?.thead[0].length;

  const [tableColumnsCount, setTableColumnsCount] = useState(columnsCount);

  useEffect(() => {
    if (content) setTableColumnsCount(columnsCount);
  }, [content]);

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
    <div className="flex justify-between items-center gap-2 px-3 py-1.5 border-b">
      <p className="text-sm">Columns</p>
      <div className="flex">
        <ValueCounter
          min={EDITOR_TABLE_SIZE.MIN_COLUMNS}
          max={EDITOR_TABLE_SIZE.MAX_COLUMNS}
          value={columnsCount}
          handleIncrement={handleColumnIncrement}
          handleDecrement={handleColumnDecrement}
          handleChange={handleColumnChange}
        />
      </div>
    </div>
  );
};

export default ColumnCounter;
