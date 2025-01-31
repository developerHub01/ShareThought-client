"use client";

import React from "react";
import PropertyWrapper_v1 from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/PropertyWrapper_v1";
import { ColorResult } from "react-color";
import {
  BorderInterface,
  BorderStyleType,
  BorderType,
} from "@/redux/features/builders/blogBuilderSlice";
import { LucideIcon } from "lucide-react";
import ToggleList from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/ToggleList";

interface AlignBlockProps {
  title: string;
  alignList: Array<{
    id: string;
    label: string;
    Icon: LucideIcon;
  }>;
  activeAlign: string;
  handleChange: (value: string) => void;
}

const AlignBlock = ({
  title,
  handleChange,
  alignList,
  activeAlign,
}: AlignBlockProps) => {
  return (
    <PropertyWrapper_v1>
      <p className="text-sm">{title}</p>
      <div className="flex">
        <ToggleList
          toggleList={alignList}
          handleChange={handleChange}
          activeItem={activeAlign}
        />
      </div>
    </PropertyWrapper_v1>
  );
};

export default AlignBlock;
