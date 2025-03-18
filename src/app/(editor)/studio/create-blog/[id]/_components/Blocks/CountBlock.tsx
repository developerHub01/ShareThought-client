"use client";

import React, { ChangeEvent, memo } from "react";
import ValueCounter from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/ValueCounter";
import PropertyWrapper_v1 from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/PropertyWrapper_v1";

interface CountBlockProps {
  label: string;
  value: number;
  handleIncrement: () => void;
  handleDecrement: () => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  BeforeComponent?: React.ComponentType; // Accepts a JSX component
  AfterComponent?: React.ComponentType; // Accepts a JSX component
  [key: string]: unknown;
}

const CountBlock = memo(
  ({
    label,
    value,
    handleIncrement,
    handleDecrement,
    handleChange,
    BeforeComponent,
    AfterComponent,
    ...props
  }: CountBlockProps) => {
    return (
      <PropertyWrapper_v1>
        <p className="text-sm">{label}</p>
        <div className="flex items-center gap-1">
          {/* Render BeforeComponent if passed */}
          {BeforeComponent && <BeforeComponent />}

          <ValueCounter
            min={0}
            value={value}
            handleIncrement={handleIncrement}
            handleDecrement={handleDecrement}
            handleChange={handleChange}
            {...props}
          />

          {/* Render AfterComponent if passed */}
          {AfterComponent && <AfterComponent />}
        </div>
      </PropertyWrapper_v1>
    );
  }
);

export default CountBlock;
