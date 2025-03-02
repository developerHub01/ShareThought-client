"use client";

import React, { ChangeEvent, useMemo } from "react";
import { Switch } from "@/components/ui/switch";
import PropertyWrapper_v1 from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/PropertyWrapper_v1";
import {
  PaddingType,
  ScreenTypes,
} from "@/redux/features/builders/blogBuilderSlice";
import ValueCounter from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/ValueCounter";
import CounterWrapper from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/CounterWrapper";

interface PaddingBlockProps {
  label?: string;
  padding: Partial<Record<PaddingType, number>>;
  handleChange: (
    padding: Partial<Record<PaddingType, number | "inc" | "dec">>
  ) => void;
  handleToggleMore: (screenType?: ScreenTypes) => void;
}

const paddingList: Array<{
  id: PaddingType;
  label: string;
}> = [
  {
    id: "paddingTop",
    label: "Top",
  },
  {
    id: "paddingRight",
    label: "Right",
  },
  {
    id: "paddingBottom",
    label: "Bottom",
  },
  {
    id: "paddingLeft",
    label: "Left",
  },
];

const PaddingBlock = ({
  label,
  padding,
  handleChange,
  handleToggleMore,
}: PaddingBlockProps) => {
  const showOnlyAllPadding = useMemo(
    () =>
      [
        padding.paddingLeft,
        padding.paddingRight,
        padding.paddingTop,
        padding.paddingBottom,
      ].some((padding) => typeof padding === "number"),
    [padding]
  );

  return (
    <PropertyWrapper_v1 className="flex flex-col gap-3">
      <div className="w-full flex justify-between items-center gap-3 flex-wrap">
        <label htmlFor="padding" className="text-sm">
          {label ?? "Padding"}
        </label>
        <Switch
          id="padding"
          checked={Boolean(showOnlyAllPadding)}
          onCheckedChange={() => handleToggleMore()}
        />
      </div>
      <div className="w-full grid grid-cols-2 gap-4">
        {!showOnlyAllPadding && (
          <CounterWrapper label="All Sides">
            <ValueCounter
              min={0}
              value={padding.padding ?? 0}
              handleIncrement={() => handleChange({ padding: "inc" })}
              handleDecrement={() => handleChange({ padding: "dec" })}
              handleChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChange({ padding: Number(e.target.value ?? 0) })
              }
            />
          </CounterWrapper>
        )}
        {showOnlyAllPadding && (
          <>
            {paddingList.map(({ id, label }) => (
              <CounterWrapper key={id} label={label}>
                <ValueCounter
                  value={padding[id] ?? 0}
                  handleIncrement={() => handleChange({ [id]: "inc" })}
                  handleDecrement={() => handleChange({ [id]: "dec" })}
                  handleChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChange({ [id]: Number(e.target.value ?? 0) })
                  }
                />
              </CounterWrapper>
            ))}
          </>
        )}
      </div>
    </PropertyWrapper_v1>
  );
};

export default PaddingBlock;
