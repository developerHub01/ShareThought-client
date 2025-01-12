"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import ValueCounter from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/ValueCounter";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import {
  addTableColumns,
  addTableRows,
  changeTableColumnsCount,
  changeTableRowsCount,
  removeTableColumns,
  removeTableRows,
  TableInterface,
} from "@/redux/features/builders/blogBuilderSlice";

const TableLayout = () => {
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
  const columnsCount = tableData?.thead[0].length;

  const [dimention, setDimention] = useState({
    rowsCount,
    columnsCount,
  });

  useEffect(() => {
    console.log({ rowsCount, columnsCount });

    if (content)
      setDimention((prev) => ({
        ...prev,
        rowsCount,
        columnsCount,
      }));
  }, [content]);

  /* Columns handlers =========== */
  const handleColumnIncrement = () => {
    setDimention((prev) => ({
      ...prev,
      columnsCount: Math.min(8, prev.columnsCount + 1),
    }));

    dispatch(
      addTableColumns({
        blogId,
        id: activeBlock,
      })
    );
  };

  const handleColumnDecrement = () => {
    setDimention((prev) => ({
      ...prev,
      columnsCount: Math.max(1, prev.columnsCount - 1),
    }));

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
    const columnsCount = value <= 0 ? 1 : value > 8 ? 8 : value;

    setDimention((prev) => ({
      ...prev,
      columnsCount,
    }));

    dispatch(
      changeTableColumnsCount({
        blogId,
        id: activeBlock,
        value: columnsCount,
      })
    );
  };

  /* Rows handlers =========== */
  const handleRowsIncrement = () => {
    setDimention((prev) => ({
      ...prev,
      rowsCount: prev.rowsCount + 1,
    }));

    dispatch(
      addTableRows({
        blogId,
        id: activeBlock,
      })
    );
  };

  const handleRowsDecrement = () => {
    setDimention((prev) => ({
      ...prev,
      rowsCount: Math.max(0, prev.rowsCount - 1),
    }));

    dispatch(
      removeTableRows({
        blogId,
        id: activeBlock,
      })
    );
  };

  const handleRowsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    const rowsCount = Math.max(0, value);

    setDimention((prev) => ({
      ...prev,
      rowsCount,
    }));

    dispatch(
      changeTableRowsCount({
        blogId,
        id: activeBlock,
        value: rowsCount,
      })
    );
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between items-center gap-2 px-3 py-1.5 border-b">
        <p className="text-sm">Columns</p>
        <div className="flex">
          <ValueCounter
            min={1}
            max={8}
            value={dimention.columnsCount}
            handleIncrement={handleColumnIncrement}
            handleDecrement={handleColumnDecrement}
            handleChange={handleColumnChange}
          />
        </div>
      </div>
      <div className="flex justify-between items-center gap-2 px-3 py-1.5 border-b">
        <p className="text-sm">Rows</p>
        <div className="flex">
          <ValueCounter
            min={0}
            value={dimention.rowsCount}
            handleIncrement={handleRowsIncrement}
            handleDecrement={handleRowsDecrement}
            handleChange={handleRowsChange}
          />
        </div>
      </div>
    </div>
  );
};

export default TableLayout;
