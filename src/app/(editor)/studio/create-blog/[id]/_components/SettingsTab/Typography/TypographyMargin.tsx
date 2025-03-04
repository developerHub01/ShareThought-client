"use client";

import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import {
  addGlobalStyle,
  MarginType,
} from "@/redux/features/builders/blogBuilderSlice";
import MarginBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/MarginBlock";
import { EDITOR_DEFAULT_VALUES } from "@/constant";
import { useSettingTypography } from "@/app/(editor)/studio/create-blog/[id]/_context/SettingTab/SettingTypographyProvider";
import useActiveStyleSettingTab from "@/hooks/editor/use-active-style-setting-tab";

const marginStyleConstraints = {
  defaultStyles: {
    marginTop: EDITOR_DEFAULT_VALUES.MARGIN.DEFAULT.default.marginTop,
    marginBottom: EDITOR_DEFAULT_VALUES.MARGIN.DEFAULT.default.marginTop,
  },
  minStyles: {
    marginTop: EDITOR_DEFAULT_VALUES.MARGIN.MIN,
    marginBottom: EDITOR_DEFAULT_VALUES.MARGIN.MIN,
  },
  maxStyles: {
    marginTop: EDITOR_DEFAULT_VALUES.MARGIN.MAX,
    marginBottom: EDITOR_DEFAULT_VALUES.MARGIN.MAX,
  },
};

interface TypographyMarginProps {
  label?: string;
}

const TypographyMargin = ({ label }: TypographyMarginProps) => {
  const dispatch = useAppDispatch();
  const { id: blogId } = useParams<{ id: string }>();
  const { selectedTypography: type } = useSettingTypography();

  if (!blogId || !type) return null;

  const {
    screenType = "desktop",
    metaData: { globalStyles },
  } = useAppSelector((state) => state.blogBuilder.blogs[blogId]);

  const activeStyle = useActiveStyleSettingTab({
    globalStyles,
    screenType,
    type,
    propertyName: "margin",
  });

  const handleChange = (
    margin: Partial<Record<MarginType, number | "inc" | "dec">>
  ) => {
    dispatch(
      addGlobalStyle({
        blogId,
        type,
        styles: margin,
        ...marginStyleConstraints,
      })
    );
  };

  return (
    <MarginBlock
      label={label}
      margin={activeStyle}
      handleChange={handleChange}
    />
  );
};

export default TypographyMargin;
