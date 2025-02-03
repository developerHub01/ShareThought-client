"use client";

import React, { ChangeEvent, FocusEvent } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ColorResult, SketchPicker } from "react-color";

interface ColorPickerProps {
  color: string;
  handleColorPicker: (color: ColorResult, e: ChangeEvent) => void;
  handleColorChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleColorBlur: (e: FocusEvent<HTMLInputElement>) => void;
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

const transparentImage = "/images/transparent.jpg";

const ColorPicker = ({
  color,
  handleColorPicker,
  handleColorChange,
  handleColorBlur,
}: ColorPickerProps) => {
  return (
    <div className="flex items-center gap-1 border rounded-sm p-0.5">
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="size-6 md:size-7 border-2 rounded-sm"
            style={{
              background:
                color === "transparent" ? `url(${transparentImage})` : color,
            }}
          ></button>
        </PopoverTrigger>
        <PopoverContent
          className="w-fit p-0"
          side="top"
          align="end"
          sideOffset={5}
        >
          <SketchPicker
            color={color}
            onChangeComplete={handleColorPicker}
            // onChange={handleColorPicker}
            disableAlpha={true}
            presetColors={colorList}
          />
        </PopoverContent>
      </Popover>
      <input
        type="text"
        value={color}
        className="w-16 text-center rounded-none"
        onChange={handleColorChange}
        onBlur={handleColorBlur}
      />
    </div>
  );
};

export default ColorPicker;
