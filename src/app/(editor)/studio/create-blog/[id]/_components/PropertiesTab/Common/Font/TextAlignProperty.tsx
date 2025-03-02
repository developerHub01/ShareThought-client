"use client";

import React, { CSSProperties, useMemo } from "react";
import TextAlignBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/TextAlignBlock";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  LucideIcon,
} from "lucide-react";
import {
  AlignType,
  addStyle,
} from "@/redux/features/builders/blogBuilderSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import filterStyle from "@/utils/editor/filterStyle";

const alignList: Array<{
  id: AlignType;
  label: string;
  Icon: LucideIcon;
}> = [
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

const TextAlignProperty = () => {
  const dispatch = useAppDispatch();
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return null;

  const {
    activeBlock,
    screenType,
    metaData: { styles = {}, mobileStyles = {} },
  } = useAppSelector((state) => state.blogBuilder.blogs[blogId]);

  if (!activeBlock) return null;

  const activeStyle = useMemo(
    () =>
      ({
        ...filterStyle(styles[activeBlock], "textAlign"),
        ...(screenType === "mobile"
          ? filterStyle(mobileStyles[activeBlock], "textAlign")
          : {}),
      } as CSSProperties),
    [styles, mobileStyles, activeBlock, screenType]
  );

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
      activeAlign={activeStyle?.textAlign ?? alignList[0].id}
      handleChange={handleChangeAlign}
      alignList={alignList}
    />
  );
};

export default TextAlignProperty;
