"use client";

import React from "react";
import ValueCounter from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/ValueCounter";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";

const TableLayout = () => {
  const dispatch = useAppDispatch();
  const { id: blogId } = useParams();
  console.log({ blogId });

  if (!blogId) return null;

  const { activeBlock, content } = useAppSelector(
    (state) => state.blogBuilder.blogs[blogId as string]
  );

  console.log({ activeBlock, content });

  const handleColumnChange = () => {};
  const handleColumnIncrement = () => {};
  const handleColumnDecrement = () => {};

  const handleRowsChange = () => {};
  const handleRowsIncrement = () => {};
  const handleRowsDecrement = () => {};

  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between items-center gap-2 px-3 py-1.5 border-b">
        <p className="text-sm">Columns</p>
        <div className="flex">
          <ValueCounter
            min={1}
            max={8}
            value={1}
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
            min={1}
            max={8}
            value={1}
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
