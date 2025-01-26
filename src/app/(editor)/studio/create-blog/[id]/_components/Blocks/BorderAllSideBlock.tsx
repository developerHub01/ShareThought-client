"use client";

import React, { useMemo } from "react";
import PropertyWrapper_v1 from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/PropertyWrapper_v1";
import { ColorResult } from "react-color";
import {
  BorderInterface,
  BorderStyleType,
  BorderType,
} from "@/redux/features/builders/blogBuilderSlice";
import { Switch } from "@/components/ui/switch";
import BorderOptionBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/BorderOptionBlock";

interface BorderBlockProps {
  borderState: BorderInterface;
  onChangeStyle: (borderType: BorderType, style: BorderStyleType) => void;
  onChangeSize: (borderType: BorderType, value: number) => void;
  onIncreaseSize: (borderType: BorderType) => void;
  onDecreaseSize: (borderType: BorderType) => void;
  onBlurColor: (borderType: BorderType, color: string) => void;
  onChangeColor: (borderType: BorderType, color: string) => void;
  onColorPick: (borderType: BorderType, color: ColorResult) => void;
  onToggleMore: () => void;
  minSize?: number;
  maxSize?: number;
}

const borderTypeList: Array<{
  label: string;
  type: BorderType;
}> = [
  { label: "top", type: "borderTop" },
  { label: "bottom", type: "borderBottom" },
  { label: "left", type: "borderLeft" },
  { label: "right", type: "borderRight" },
];

// Helper function to get default border properties
const getBorderProps = (
  borderState: BorderInterface,
  type: BorderType | "border"
) => ({
  style: (borderState?.[type]?.[1] || "solid") as BorderStyleType,
  size: borderState?.[type]?.[0] || 0,
  color: borderState?.[type]?.[2] || "transparent",
});
const BorderAllSideBlock = ({
  borderState,
  onChangeStyle,
  onChangeSize,
  onIncreaseSize,
  onDecreaseSize,
  onBlurColor,
  onChangeColor,
  onColorPick,
  onToggleMore,
  minSize,
  maxSize,
}: BorderBlockProps) => {
  const showAllOptions = useMemo(
    () =>
      Boolean(
        borderState.borderTop ||
          borderState.borderBottom ||
          borderState.borderLeft ||
          borderState.borderRight
      ),
    [borderState]
  );

  return (
    <PropertyWrapper_v1>
      <div className="w-full flex justify-between items-center gap-3 flex-wrap">
        <label htmlFor="border" className="text-sm">
          Border
        </label>
        <Switch
          id="border"
          checked={showAllOptions}
          onCheckedChange={onToggleMore}
        />
      </div>

      <div className="flex flex-col gap-3">
        {showAllOptions || (
          <BorderOptionBlock
            type="border"
            label="All sides"
            {...getBorderProps(borderState, "border")}
            onChangeStyle={onChangeStyle}
            onChangeSize={onChangeSize}
            onIncreaseSize={onIncreaseSize}
            onDecreaseSize={onDecreaseSize}
            onBlurColor={onBlurColor}
            onChangeColor={onChangeColor}
            onColorPick={onColorPick}
            minSize={minSize}
            maxSize={maxSize}
          />
        )}

        {showAllOptions &&
          borderTypeList.map(({ label, type }) => {
            return (
              <BorderOptionBlock
                key={type}
                type={type}
                label={label}
                {...getBorderProps(borderState, type)}
                onChangeStyle={onChangeStyle}
                onChangeSize={onChangeSize}
                onIncreaseSize={onIncreaseSize}
                onDecreaseSize={onDecreaseSize}
                onBlurColor={onBlurColor}
                onChangeColor={onChangeColor}
                onColorPick={onColorPick}
                minSize={minSize}
                maxSize={maxSize}
              />
            );
          })}
      </div>
    </PropertyWrapper_v1>
  );
};

export default BorderAllSideBlock;
