"use client";

import React, { ChangeEvent, FocusEvent } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ColorResult } from "react-color";
import { hexToRgba } from "@/utils/color";
import ColorPicker from "@/components/ui/ColorPicker";

interface ColorPickerBlockProps {
  color: string;
  handleColorPicker: (color: ColorResult, e: ChangeEvent) => void;
  handleColorChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleColorBlur: (e: FocusEvent<HTMLInputElement>) => void;
}

const transparentImage = "/images/transparent.jpg";

const ColorPickerBlock = ({
  color,
  handleColorPicker,
  handleColorChange,
  handleColorBlur,
}: ColorPickerBlockProps) => {
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
          <ColorPicker color={hexToRgba(color)} onChange={handleColorPicker} />
        </PopoverContent>
      </Popover>
      <input
        type="text"
        value={color?.toUpperCase()}
        className="min-w-16 w-fit max-w-20 text-center rounded-none bg-transparent"
        onChange={handleColorChange}
        onBlur={handleColorBlur}
      />
    </div>
  );
};

export default ColorPickerBlock;
