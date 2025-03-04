"use client";

import React, { useMemo } from "react";
import SelectBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/SelectBlock";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import {
  addGlobalStyle,
  LineHeightType,
  StyleType,
} from "@/redux/features/builders/blogBuilderSlice";
import { useSettingTypography } from "@/app/(editor)/studio/create-blog/[id]/_context/SettingTab/SettingTypographyProvider";
import { EDITOR_DEFAULT_VALUES } from "@/constant";
import filterStyle from "@/utils/editor/filterStyle";

const lineHeightList = [
  {
    id: "1.2",
    label: "1.2",
  },
  {
    id: "1.5",
    label: "1.5",
  },
  {
    id: "1.8",
    label: "1.8",
  },
  {
    id: "2",
    label: "2.0",
  },
];

const TypographyLineHeight = () => {
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
      ...filterStyle(globalStyles["desktop"][type] as StyleType, "lineHeight"),
      ...(screenType === "mobile"
        ? filterStyle(globalStyles["mobile"][type] as StyleType, "lineHeight")
        : {}),
    }),
    [type, screenType, globalStyles]
  );

  const handleChangeLineHeight = (value: string) => {
    dispatch(
      addGlobalStyle({
        blogId,
        type,
        styles: {
          lineHeight: Number(value) as LineHeightType,
        },
      })
    );
  };

  return (
    <SelectBlock
      label="Line Height"
      activeValue={String(
        activeStyle?.lineHeight ??
          EDITOR_DEFAULT_VALUES.LINE_HEIGHT.DEFAULT[type]
      )}
      itemList={lineHeightList}
      handleChange={handleChangeLineHeight}
    />
  );
};

export default TypographyLineHeight;
