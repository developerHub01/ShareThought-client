"use client";

import React, { ChangeEvent, FocusEvent } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ColorResult } from "react-color";
import ColorPickerBlock from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/ColorPickerBlock";
import ValueCounter from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/ValueCounter";
import { BorderStyleType } from "@/redux/features/builders/blogBuilderSlice";
import { cn } from "@/lib/utils";

interface BorderBlockProps {
  borderState: {
    style: BorderStyleType;
    size: number;
    color: string;
  };
  onChangeStyle: (style: BorderStyleType) => void;
  onChangeSize: (e: ChangeEvent<HTMLInputElement>) => void;
  onIncreaseSize: () => void;
  onDecreaseSize: () => void;
  onBlurColor: (e: FocusEvent<HTMLInputElement>) => void;
  onChangeColor: (e: ChangeEvent<HTMLInputElement>) => void;
  onColorPick: (color: ColorResult, e: ChangeEvent) => void;
  minSize: number;
  maxSize: number;
  className?: string;
}

const BorderCoreBlock = ({
  borderState,
  onChangeStyle,
  onChangeSize,
  onIncreaseSize,
  onDecreaseSize,
  onBlurColor,
  onChangeColor,
  onColorPick,
  minSize,
  maxSize,
  className = "",
}: BorderBlockProps) => {
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <Select
        defaultValue="solid"
        value={borderState.style}
        onValueChange={onChangeStyle}
      >
        <SelectTrigger className="max-w-28">
          <SelectValue placeholder="Border style" />
        </SelectTrigger>
        <SelectContent align="end">
          <SelectGroup>
            <SelectItem value="solid">Solid</SelectItem>
            <SelectItem value="dotted">Dotted</SelectItem>
            <SelectItem value="dashed">Dashed</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <ValueCounter
        value={borderState.size}
        handleChange={onChangeSize}
        handleIncrement={onIncreaseSize}
        handleDecrement={onDecreaseSize}
        min={minSize}
        max={maxSize}
        separate={false}
      />
      <ColorPickerBlock
        color={borderState.color}
        handleColorPicker={onColorPick}
        handleColorChange={onChangeColor}
        handleColorBlur={onBlurColor}
      />
    </div>
  );
};

export default BorderCoreBlock;
