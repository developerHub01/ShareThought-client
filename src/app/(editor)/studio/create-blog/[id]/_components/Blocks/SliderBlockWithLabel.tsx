import React from "react";
import PropertyWrapper_v1 from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/PropertyWrapper_v1";
import SliderBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/SliderBlock";

interface SliderBlockWithLabelProps {
  label?: string;
  unit?: "%" | "deg" | "&deg;" | "px";
  min?: number;
  max?: number;
  defaultValue?: number;
  value?: number;
  onChange: (value: number) => void;
}

const SliderBlockWithLabel = ({
  label,
  unit = "%",
  min = 0,
  max = 100,
  defaultValue =80,
  value = 100,
  onChange,
}: SliderBlockWithLabelProps) => {
  return (
    <PropertyWrapper_v1 className="flex-col items-start gap-10">
      {label && <p className="text-sm">{label}</p>}
      <SliderBlock
        unit={unit}
        min={min}
        max={max}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
      />
    </PropertyWrapper_v1>
  );
};

export default SliderBlockWithLabel;
