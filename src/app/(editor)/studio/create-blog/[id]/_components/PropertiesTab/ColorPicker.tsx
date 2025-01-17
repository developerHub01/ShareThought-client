"use client";

import React, { ChangeEvent, FocusEvent, useState } from "react";
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
            className="size-6 md:size-7 border-2 rounded-sm"
            style={{
              background: color,
            }}
          ></button>
        </PopoverTrigger>
        <PopoverContent>
          <SketchPicker color={color} onChangeComplete={handleColorPicker} />
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
