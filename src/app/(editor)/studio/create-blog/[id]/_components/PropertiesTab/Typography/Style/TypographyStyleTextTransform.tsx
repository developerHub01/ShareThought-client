"use client";

import React, { CSSProperties } from "react";
import TextAlignBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/TextAlignBlock";
import {
  ALargeSmall as CapitalizeIcon,
  CaseUpper as UppercaseIcon,
  CaseLower as LowercaseIcon,
  X as ClearIcon,
} from "lucide-react";
import {
  TextTransformType,
  addStyle,
} from "@/redux/features/builders/blogBuilderSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";

const transformList = [
  {
    id: "capitalize",
    label: "capitalize",
    Icon: CapitalizeIcon,
  },
  {
    id: "uppercase",
    label: "uppercase",
    Icon: UppercaseIcon,
  },
  {
    id: "lowercase",
    label: "lowercase",
    Icon: LowercaseIcon,
  },
  {
    id: "none",
    label: "Clear",
    Icon: ClearIcon,
  },
];

const TypographyStyleTextTransform = () => {
  const dispatch = useAppDispatch();
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return null;

  const {
    activeBlock,
    metaData: { styles },
  } = useAppSelector((state) => state.blogBuilder.blogs[blogId]);

  if (!activeBlock) return null;

  const activeStyle = styles[activeBlock] as CSSProperties;

  const handleChangeTransform = (value: string) => {
    dispatch(
      addStyle({
        blogId,
        activeBlockId: activeBlock,
        styles: {
          textTransform: value as TextTransformType,
        },
      })
    );
  };

  return (
    <TextAlignBlock
      title="Text Transform"
      activeAlign={activeStyle?.textTransform || "none"}
      handleChange={handleChangeTransform}
      alignList={transformList}
    />
  );
};

export default TypographyStyleTextTransform;
