"use client";

import React, { ChangeEvent, FocusEvent } from "react";
import PropertyWrapper_v1 from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/PropertyWrapper_v1";
import { BorderStyleType } from "@/redux/features/builders/blogBuilderSlice";
import BorderCoreBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/BorderCoreBlock";
import { ColorResult } from "react-color";

interface BorderBlockProps {
  label: string;
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
  label = "Border",
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
      <p className="text-sm">{label}</p>
      <BorderCoreBlock
        borderState={borderState}
        onChangeStyle={onChangeStyle}
        onChangeSize={onChangeSize}
        onIncreaseSize={onIncreaseSize}
        onDecreaseSize={onDecreaseSize}
        onBlurColor={onBlurColor}
        onChangeColor={onChangeColor}
        onColorPick={onColorPick}
        minSize={minSize}
        maxSize={maxSize}
        className="ml-auto"
      />
    </PropertyWrapper_v1>
  );
};

export default BorderBlock;
