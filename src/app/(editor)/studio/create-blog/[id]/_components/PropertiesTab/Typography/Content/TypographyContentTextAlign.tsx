"use client";

import React, { CSSProperties } from "react";
import TextAlignBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/TextAlignBlock";
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from "lucide-react";
import {
  AlignType,
  addStyle,
} from "@/redux/features/builders/blogBuilderSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";

const alignList = [
  {
    id: "left",
    label: "Align Left",
    Icon: AlignLeft,
  },
  {
    id: "center",
    label: "Align Center",
    Icon: AlignCenter,
  },
  {
    id: "right",
    label: "Align Right",
    Icon: AlignRight,
  },
  {
    id: "justify",
    label: "Align Justify",
    Icon: AlignJustify,
  },
];

const TypographyContentTextAlign = () => {
  const dispatch = useAppDispatch();
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return null;

  const {
    activeBlock,
    metaData: { styles },
  } = useAppSelector((state) => state.blogBuilder.blogs[blogId]);

  if (!activeBlock) return null;

  const activeStyle = styles[activeBlock] as CSSProperties;

  const handleChangeAlign = (value: string) => {
    dispatch(
      addStyle({
        blogId,
        activeBlockId: activeBlock,
        styles: {
          textAlign: value as AlignType,
        },
      })
    );
  };

  return (
    <TextAlignBlock
      title="Align"
      activeAlign={activeStyle?.textAlign || (alignList[0].id as AlignType)}
      handleChange={handleChangeAlign}
      alignList={alignList}
    />
  );
};

export default TypographyContentTextAlign;
