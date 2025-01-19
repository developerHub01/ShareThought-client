"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import ValueCounter from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/ValueCounter";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import {
  addTableRows,
  changeTableRowsCount,
  removeTableRows,
  TableInterface,
} from "@/redux/features/builders/blogBuilderSlice";
import { EDITOR_TABLE_SIZE } from "@/constant";
import PropertyWrapper_v1 from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/PropertyWrapper_v1";

interface CountBlockProps {
  title: string;
  value: number;
  handleIncrement: () => void;
  handleDecrement: () => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  [key: string]: unknown
}

const CountBlock = ({
  title,
  value,
  handleIncrement,
  handleDecrement,
  handleChange,
  ...props
}: CountBlockProps) => {
  return (
    <PropertyWrapper_v1>
      <p className="text-sm">{title}</p>
      <div className="flex">
        <ValueCounter
          min={0}
          value={value}
          handleIncrement={handleIncrement}
          handleDecrement={handleDecrement}
          handleChange={handleChange}
          {...props}
        />
      </div>
    </PropertyWrapper_v1>
  );
};

export default CountBlock;
