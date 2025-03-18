"use client";

import React, { memo } from "react";
import SelectBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/SelectBlock";
import { useParams } from "next/navigation";
import { TypographyType as TypographyTypes } from "@/redux/features/builders/blogBuilderSlice";
import { typographyTypeList } from "@/constant";
import { useSettingTypography } from "@/app/(editor)/studio/create-blog/[id]/_context/SettingTab/SettingTypographyProvider";

const typeList = [
  ...typographyTypeList,
  {
    id: "button",
    label: "Button",
  },
];

const TypographyType = memo(() => {
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return null;

  const { selectedTypography, setSelectedTypography } = useSettingTypography();

  const handleChange = (value: TypographyTypes) => setSelectedTypography(value);

  return (
    <SelectBlock
      label="Type"
      activeValue={selectedTypography ?? typeList[0].id}
      itemList={typeList}
      handleChange={(value) => handleChange(value as TypographyTypes)}
    />
  );
});

export default TypographyType;
