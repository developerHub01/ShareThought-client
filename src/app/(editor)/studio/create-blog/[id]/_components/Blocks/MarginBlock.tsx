"use client";

import React, { ChangeEvent } from "react";
import PropertyWrapper_v1 from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/PropertyWrapper_v1";
import { MarginType } from "@/redux/features/builders/blogBuilderSlice";
import ValueCounter from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/ValueCounter";
import CounterWrapper from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/CounterWrapper";

interface MarginBlockProps {
  label?: string;
  margin: Partial<Record<MarginType, number>>;
  handleChange: (
    margin: Partial<Record<MarginType, number | "inc" | "dec">>
  ) => void;
  BeforeComponent?: React.ComponentType; // Accepts a JSX component
  AfterComponent?: React.ComponentType; // Accepts a JSX component
  [key: string]: unknown;
}

const marginList: Array<{
  id: MarginType;
  label: string;
}> = [
  {
    id: "marginTop",
    label: "Top",
  },
  {
    id: "marginBottom",
    label: "Bottom",
  },
];

const MarginBlock = ({
  label,
  margin,
  handleChange,
  BeforeComponent,
  AfterComponent,
  ...props
}: MarginBlockProps) => {
  return (
    <PropertyWrapper_v1 className="flex flex-col gap-3">
      <div className="w-full flex justify-between items-center gap-3 flex-wrap">
        {/* Render BeforeComponent if passed */}
        {BeforeComponent && <BeforeComponent />}

        <p className="text-sm">{label ?? "Margin"}</p>

        {/* Render AfterComponent if passed */}
        {AfterComponent && <AfterComponent />}
      </div>
      <div className="w-full grid grid-cols-2 gap-4">
        {marginList.map(({ id, label }) => (
          <CounterWrapper key={id} label={label}>
            <ValueCounter
              value={margin[id] ?? 0}
              handleIncrement={() => handleChange({ [id]: "inc" })}
              handleDecrement={() => handleChange({ [id]: "inc" })}
              handleChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChange({ [id]: Number(e.target.value ?? 0) })
              }
            />
          </CounterWrapper>
        ))}
      </div>
    </PropertyWrapper_v1>
  );
};

export default MarginBlock;
