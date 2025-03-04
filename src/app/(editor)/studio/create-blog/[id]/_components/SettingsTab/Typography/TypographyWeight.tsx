"use client";

import React, { useMemo } from "react";
import SelectBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/SelectBlock";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import {
  addGlobalStyle,
  addStyle,
  StyleType,
} from "@/redux/features/builders/blogBuilderSlice";
import { useSettingTypography } from "@/app/(editor)/studio/create-blog/[id]/_context/SettingTab/SettingTypographyProvider";
import { EDITOR_DEFAULT_VALUES } from "@/constant";
import filterStyle from "@/utils/editor/filterStyle";

const fontWeightList = [
  {
    id: "normal",
    label: "Normal",
  },
  {
    id: "bold",
    label: "Bold",
  },
];

const TypographyWeight = () => {
  const dispatch = useAppDispatch();
  const { id: blogId } = useParams<{ id: string }>();
  const { selectedTypography: type } = useSettingTypography();

  if (!blogId || !type) return null;

  const {
    screenType = "desktop",
    metaData: { globalStyles },
  } = useAppSelector((state) => state.blogBuilder.blogs[blogId]);

  const activeStyle = useMemo(
    () => ({
      ...filterStyle(globalStyles["desktop"][type] as StyleType, "fontWeight"),
      ...(screenType === "mobile"
        ? filterStyle(globalStyles["mobile"][type] as StyleType, "fontWeight")
        : {}),
    }),
    [type, screenType, globalStyles]
  );

  const handleChangeFontWeight = (value: string) => {
    dispatch(
      addGlobalStyle({
        blogId,
        type,
        styles: {
          fontWeight: value,
        },
      })
    );
  };

  return (
    <SelectBlock
      label="Font Weight"
      activeValue={String(
        activeStyle?.fontWeight ??
          EDITOR_DEFAULT_VALUES.FONT_WEIGHT.DEFAULT[type]
      )}
      itemList={fontWeightList}
      handleChange={handleChangeFontWeight}
    />
  );
};

export default TypographyWeight;
