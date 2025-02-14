"use client";

import React, { ChangeEvent } from "react";
import { ColorResult, SketchPicker } from "react-color";
import { rgbaToHex } from "@/utils/color";

interface ColorPickerProps {
  color: string;
  onChange: (color: ColorResult, e: ChangeEvent) => void;
}

const colorList = [
  "transparent",
  "#1abc9c",
  "#2ecc71",
  "#3498db",
  "#9b59b6",
  "#34495e",
  "#f1c40f",
  "#d35400",
  "#bdc3c7",
  "#7f8c8d",
  "#192a56",
  "#7158e2",
  "#d63031",
  "#e84393",
  "#6D214F",
  "#1e272e",
];

const ColorPicker = ({ color, onChange }: ColorPickerProps) => {
  return (
    <SketchPicker
      color={color}
      onChangeComplete={onChange}
      onChange={(color: ColorResult, e: ChangeEvent) => {
        color.hex = rgbaToHex(
          color.rgb.r,
          color.rgb.g,
          color.rgb.b,
          color.rgb.a
        );

        onChange(color, e);
      }}
      disableAlpha={false}
      presetColors={colorList}
    />
  );
};

export default ColorPicker;
