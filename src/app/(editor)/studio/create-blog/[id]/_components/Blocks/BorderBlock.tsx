"use client";

import React, { ChangeEvent, FocusEvent } from "react";
import PropertyWrapper_v1 from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/PropertyWrapper_v1";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ColorResult } from "react-color";
import ColorPicker from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/ColorPicker";
import ValueCounter from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/ValueCounter";
import { BorderStyleType } from "@/redux/features/builders/blogBuilderSlice";

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
}

const BorderBlock = ({
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
}: BorderBlockProps) => {
  return (
    <PropertyWrapper_v1>
      <p className="text-sm">Border</p>
      <div className="flex items-center gap-1.5 ml-auto">
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
        <ColorPicker
          color={borderState.color}
          handleColorPicker={onColorPick}
          handleColorChange={onChangeColor}
          handleColorBlur={onBlurColor}
        />
      </div>
    </PropertyWrapper_v1>
  );
};

export default BorderBlock;
