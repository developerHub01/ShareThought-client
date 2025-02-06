"use client";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FontSizeType =
  | "text-xs"
  | "text-sm"
  | "text-base"
  | "text-lg"
  | "text-xl"
  | "text-2xl"
  | "text-3xl"
  | "text-4xl"
  | "text-5xl"
  | "text-6xl"
  | "text-7xl"
  | "text-8xl"
  | "text-9xl";

const Page = () => {
  const [fontSize, setFontSize] = useState<FontSizeType>("text-base");

  return (
    <div className="p-5 bg-zinc-300 flex gap-3 justify-between">
      {/* Text with dynamic font size */}
      <div>
        <h1 className={`${fontSize} font-semibold`}>Hello World</h1>
      </div>

      {/* Font Size Selector */}
      <div>
        <Select onValueChange={(value) => setFontSize(value as FontSizeType)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Font Size" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {[
                "text-xs",
                "text-sm",
                "text-base",
                "text-lg",
                "text-xl",
                "text-2xl",
                "text-3xl",
                "text-4xl",
                "text-5xl",
                "text-6xl",
                "text-7xl",
                "text-8xl",
                "text-9xl",
              ].map((size) => (
                <SelectItem key={size} value={size}>
                  {size}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Page;
