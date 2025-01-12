"use client";

import React, { ChangeEvent, FocusEvent, useState } from "react";
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
import { isValidHexColor } from "@/utils";
import ColorPicker from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/ColorPicker";

const Border = () => {
  const [lastValidColor, setLastValidColor] = useState("#343434");
  const [borderState, setBorderState] = useState({
    style: "solid",
    color: "#343434",
  });

  const handleColorPicker = (color: ColorResult, e: ChangeEvent) => {
    const newColor = color.hex;
    if (isValidHexColor(newColor)) setLastValidColor(newColor);

    setBorderState((prev) => ({
      ...prev,
      color: newColor,
    }));
  };

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;

    if (isValidHexColor(color)) setLastValidColor(color);

    setBorderState((prev) => ({
      ...prev,
      color,
    }));
  };

  const handleColorBlur = (e: FocusEvent<HTMLInputElement>) => {
    let color = e.target.value;

    if (!isValidHexColor(color))
      return setBorderState((prev) => ({
        ...prev,
        color: lastValidColor,
      }));

    setBorderState((prev) => ({
      ...prev,
      color,
    }));
  };

  return (
    <PropertyWrapper_v1>
      <p className="text-sm">Border</p>
      <div className="flex items-center gap-1.5">
        <Select defaultValue="solid">
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
        <ColorPicker
          color={borderState.color}
          handleColorPicker={handleColorPicker}
          handleColorChange={handleColorChange}
          handleColorBlur={handleColorBlur}
        />
      </div>
    </PropertyWrapper_v1>
  );
};

export default Border;
