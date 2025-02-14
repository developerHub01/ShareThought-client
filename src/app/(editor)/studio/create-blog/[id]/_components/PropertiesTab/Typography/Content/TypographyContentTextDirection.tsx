"use client";

import React, { CSSProperties } from "react";
import TextAlignBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/TextAlignBlock";
import { PilcrowRight as LRTIcon, PilcrowLeft as RTLIcon } from "lucide-react";
import {
  TextDirectionType,
  addStyle,
} from "@/redux/features/builders/blogBuilderSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";

const alignList = [
  {
    id: "ltr",
    label: "Left to Right",
    Icon: LRTIcon,
  },
  {
    id: "rtl",
    label: "Right to Left",
    Icon: RTLIcon,
  },
];

const TypographyContentTextDirection = () => {
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
          textDirection: value as TextDirectionType,
        },
      })
    );
  };

  return (
    <TextAlignBlock
      title="Text Direction"
      activeAlign={activeStyle?.direction || alignList[0].id}
      handleChange={handleChangeAlign}
      alignList={alignList}
    />
  );
};

export default TypographyContentTextDirection;
