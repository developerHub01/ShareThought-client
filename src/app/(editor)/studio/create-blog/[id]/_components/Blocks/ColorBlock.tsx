"use client";

import React, { ChangeEvent, FocusEvent } from "react";
import ColorPicker from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/ColorPicker";
import PropertyWrapper_v1 from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/PropertyWrapper_v1";
import { ColorResult } from "react-color";

interface ColorBlockProps {
  title: string;
  colorState: string;
  handleColorPicker: (color: ColorResult, e: ChangeEvent) => void;
  handleColorChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleColorBlur: (e: FocusEvent<HTMLInputElement>) => void;
}

const ColorBlock = ({
  title,
  colorState,
  handleColorPicker,
  handleColorChange,
  handleColorBlur,
}: ColorBlockProps) => {
  return (
    <PropertyWrapper_v1>
      <p className="text-sm">{title}</p>
      <div className="flex items-center gap-1.5 ml-auto">
        <ColorPicker
          color={colorState}
          handleColorPicker={handleColorPicker}
          handleColorChange={handleColorChange}
          handleColorBlur={handleColorBlur}
        />
      </div>
    </PropertyWrapper_v1>
  );
};

export default ColorBlock;
