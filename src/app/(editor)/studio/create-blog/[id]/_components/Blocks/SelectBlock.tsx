"use client";

import React from "react";
import PropertyWrapper_v1 from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/PropertyWrapper_v1";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectBlockProps {
  label: string;
  placeholder?: string;
  activeValue: string;
  handleChange: (value: string) => void;
  itemList: Array<{
    id: string;
    label: string;
  }>;
  BeforeComponent?: React.ComponentType; // Accepts a JSX component
  AfterComponent?: React.ComponentType; // Accepts a JSX component
}

const SelectBlock = ({
  label,
  placeholder,
  handleChange,
  activeValue,
  itemList,
  BeforeComponent,
  AfterComponent,
}: SelectBlockProps) => {
  return (
    <PropertyWrapper_v1>
      <p className="text-sm">{label}</p>
      <div className="flex items-center gap-1">
        {/* Render BeforeComponent if passed */}
        {BeforeComponent && <BeforeComponent />}

        <Select
          defaultValue={activeValue}
          value={activeValue}
          onValueChange={handleChange}
        >
          <SelectTrigger className="min-w-32">
            <SelectValue placeholder={placeholder || label} />
          </SelectTrigger>
          <SelectContent align="end">
            <SelectGroup>
              {itemList.map(({ id, label }) => (
                <SelectItem key={id} value={id}>
                  {label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Render AfterComponent if passed */}
        {AfterComponent && <AfterComponent />}
      </div>
    </PropertyWrapper_v1>
  );
};

export default SelectBlock;
