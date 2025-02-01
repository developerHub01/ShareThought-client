"use client";

import React, { ChangeEvent } from "react";
import ValueCounter from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/ValueCounter";
import PropertyWrapper_v1 from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/PropertyWrapper_v1";

interface CountBlockProps {
  label: string;
  value: number;
  handleIncrement: () => void;
  handleDecrement: () => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  [key: string]: unknown
}

const CountBlock = ({
  label,
  value,
  handleIncrement,
  handleDecrement,
  handleChange,
  ...props
}: CountBlockProps) => {
  return (
    <PropertyWrapper_v1>
      <p className="text-sm">{label}</p>
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
