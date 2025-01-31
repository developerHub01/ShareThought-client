import React, { useMemo } from "react";
import PropertyWrapper_v1 from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/PropertyWrapper_v1";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface SliderBlockProps {
  label: string;
  unit?: "%" | "deg" | "&deg;" | "px";
  min?: number;
  max?: number;
  defaultValue?: number;
  value?: number;
  onChange: (value: number) => void;
}

const SliderBlock = ({
  label,
  unit = "%",
  min = 0,
  max = 100,
  defaultValue = 100,
  value = 100,
  onChange,
}: SliderBlockProps) => {
  const currentPercent = useMemo(
    () => Math.round(((value - min) * 100) / (max - min)),
    [value, min, max]
  );
  
  return (
    <PropertyWrapper_v1 className="flex-col items-start gap-10">
      <p className="text-sm">{label}</p>
      <div className="w-full flex justify-between items-center gap-4">
        <Label className="flex-shrink-0">
          {min} {unit}
        </Label>
        <div className="w-full relative">
          <Badge
            className="min-w-8 hover:hover:bg-primary text-center w-fit whitespace-nowrap absolute z-10 top-0 -translate-x-1/2 -translate-y-full -mt-4 rounded-md before:size-4 before:bg-primary before:absolute before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:translate-y-1/3 before:rotate-45 before:rounded-[2px] before:-z-10"
            style={{
              left: `calc(${currentPercent}% ${
                currentPercent < 50 ? "+" : "-"
              } 10px)`,
            }}
          >
            {Math.round(value)} {unit}
          </Badge>
          <Slider
            defaultValue={[defaultValue]}
            max={max}
            min={min}
            className={"w-full"}
            value={[value]}
            onValueChange={(values: Array<number>) => onChange(values[0])}
          />
        </div>
        <Label className="flex-shrink-0">
          {max} {unit}
        </Label>
      </div>
    </PropertyWrapper_v1>
  );
};

export default SliderBlock;
