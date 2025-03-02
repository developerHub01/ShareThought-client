"use client";

import React, { ChangeEvent, useMemo, useState } from "react";
import { Switch } from "@/components/ui/switch";
import PropertyWrapper_v1 from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/PropertyWrapper_v1";
import {
  PaddingType,
  ScreenTypes,
} from "@/redux/features/builders/blogBuilderSlice";
import ValueCounter from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/ValueCounter";
import CounterWrapper from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/CounterWrapper";
import ResponsiveToggleBlock from "./ResponsiveToggleBlock";

interface PaddingBlockProps {
  label?: string;
  padding: Record<ScreenTypes, Partial<Record<PaddingType, number>>>;
  handleChange: (
    padding: Partial<Record<PaddingType, number | "inc" | "dec">>,
    screenType: ScreenTypes
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
  const [screenType, setScreenType] = useState<ScreenTypes>("desktop");

  const handleScreenTypeChange = () =>
    setScreenType((prev) => (prev === "mobile" ? "desktop" : "mobile"));

  const showOnlyAllPadding = useMemo(
    () =>
      [
        padding[screenType].paddingLeft,
        padding[screenType].paddingRight,
        padding[screenType].paddingTop,
        padding[screenType].paddingBottom,
      ].some((padding) => typeof padding === "number"),
    [padding, screenType]
  );

  return (
    <PropertyWrapper_v1 className="flex flex-col gap-3">
      <div className="w-full flex justify-between items-center gap-3 flex-wrap">
        <label htmlFor="padding" className="text-sm">
          {label ?? "Padding"}
        </label>
        <div className="flex gap-2 items-center">
          <Switch
            id="padding"
            checked={Boolean(showOnlyAllPadding)}
            onCheckedChange={() => handleToggleMore(screenType)}
          />
          <ResponsiveToggleBlock
            value={screenType}
            handleChange={handleScreenTypeChange}
          />
        </div>
      </div>
      <div className="w-full grid grid-cols-2 gap-4">
        {!showOnlyAllPadding && (
          <CounterWrapper label="All Sides">
            <ValueCounter
              min={0}
              value={padding[screenType].padding ?? 0}
              handleIncrement={() =>
                handleChange({ padding: "inc" }, screenType)
              }
              handleDecrement={() =>
                handleChange({ padding: "dec" }, screenType)
              }
              handleChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChange(
                  { padding: Number(e.target.value ?? 0) },
                  screenType
                )
              }
            />
          </CounterWrapper>
        )}
        {showOnlyAllPadding && (
          <>
            {paddingList.map(({ id, label }) => (
              <CounterWrapper key={id} label={label}>
                <ValueCounter
                  value={padding[screenType][id] ?? 0}
                  handleIncrement={() =>
                    handleChange({ [id]: "inc" }, screenType)
                  }
                  handleDecrement={() =>
                    handleChange({ [id]: "dec" }, screenType)
                  }
                  handleChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChange(
                      { [id]: Number(e.target.value ?? 0) },
                      screenType
                    )
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
