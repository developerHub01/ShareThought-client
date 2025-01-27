import React from "react";
import PropertyWrapper_v1 from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/PropertyWrapper_v1";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface SliderBlockProps {
  label: string;
  min?: number;
  max?: number;
  defaultValue?: number;
  value?: number;
  onChange: (value: number) => void;
}

const SliderBlock = ({
  label,
  min = 0,
  max = 100,
  defaultValue = 100,
  value = 100,
  onChange,
}: SliderBlockProps) => {
  return (
    <PropertyWrapper_v1 className="flex-col items-start gap-10">
      <p className="text-sm">{label}</p>
      <div className="w-full flex justify-between items-center gap-4">
        <Label className="flex-shrink-0">{min} %</Label>
        <div className="w-full relative">
          <Badge
            className="min-w-8 text-center w-fit whitespace-nowrap absolute z-10 top-0 -translate-x-1/2 -translate-y-full -mt-4 before:size-4 before:bg-primary before:absolute before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:translate-y-1/3 before:rotate-45 before:rounded-[2px] before:-z-10"
            style={{
              left: `calc(${value}% ${value < 50 ? "+" : "-"} 10px)`,
            }}
          >
            {Math.round(value)} %
          </Badge>
          <Slider
            defaultValue={[100]}
            max={max}
            min={min}
            className={"w-full"}
            value={[value]}
            onValueChange={(values: Array<number>) => {
              console.log({ values });
              onChange(values[0]);
            }}
          />
        </div>
        <Label className="flex-shrink-0">{max} %</Label>
      </div>
    </PropertyWrapper_v1>
  );
};

export default SliderBlock;
