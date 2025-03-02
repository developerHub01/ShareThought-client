"use client";

import React, { ChangeEvent, useState } from "react";
import PropertyWrapper_v1 from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/PropertyWrapper_v1";
import {
  MarginType,
  ScreenTypes,
} from "@/redux/features/builders/blogBuilderSlice";
import ValueCounter from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/ValueCounter";
import CounterWrapper from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/CounterWrapper";
import ResponsiveToggleBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/ResponsiveToggleBlock";

interface MarginBlockProps {
  label?: string;
  margin: Record<ScreenTypes, Partial<Record<MarginType, number>>>;
  handleChange: (
    margin: Partial<Record<MarginType, number | "inc" | "dec">>,
    screenType: ScreenTypes
  ) => void;
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

const MarginBlock = ({ label, margin, handleChange }: MarginBlockProps) => {
  const [screenType, setScreenType] = useState<ScreenTypes>("desktop");

  const handleScreenTypeChange = () =>
    setScreenType((prev) => (prev === "mobile" ? "desktop" : "mobile"));

  return (
    <PropertyWrapper_v1 className="flex flex-col gap-3">
      <div className="w-full flex justify-between items-center gap-3 flex-wrap">
        <p className="text-sm">{label ?? "Margin"}</p>
        <ResponsiveToggleBlock
          value={screenType}
          handleChange={handleScreenTypeChange}
        />
      </div>
      <div className="w-full grid grid-cols-2 gap-4">
        {marginList.map(({ id, label }) => (
          <CounterWrapper key={id} label={label}>
            <ValueCounter
              value={margin[screenType][id] ?? 0}
              handleIncrement={() => handleChange({ [id]: "inc" }, screenType)}
              handleDecrement={() => handleChange({ [id]: "inc" }, screenType)}
              handleChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChange({ [id]: Number(e.target.value ?? 0) }, screenType)
              }
            />
          </CounterWrapper>
        ))}
      </div>
    </PropertyWrapper_v1>
  );
};

export default MarginBlock;
