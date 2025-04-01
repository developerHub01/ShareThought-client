"use client";

import React from "react";
import TextAlignBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/TextAlignBlock";
import {
  AlignCenterVertical,
  AlignEndVertical,
  AlignStartVertical,
} from "@/lib/icons";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  selectBlogActiveBlock,
  selectBlogStylesById,
} from "@/redux/features/builders/selectors";
import { addStyle } from "@/redux/features/builders/blogBuilderSlice";

const alignList = [
  {
    id: "flex-start",
    label: "Left",
    Icon: AlignStartVertical,
  },
  {
    id: "center",
    label: "Center",
    Icon: AlignCenterVertical,
  },
  {
    id: "flex-end",
    label: "Right",
    Icon: AlignEndVertical,
  },
];

const HorizontalAlign = () => {
  const { id: blogId } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  if (!blogId) return null;

  const activeBlock = useAppSelector((state) =>
    selectBlogActiveBlock(state, blogId)
  );
  const styles = useAppSelector((state) =>
    selectBlogStylesById(state, blogId, activeBlock)
  );

  if (!activeBlock) return null;

  const handleAlignItems = (value: string) => {
    dispatch(
      addStyle({
        blogId,
        activeBlockId: activeBlock,
        styles: {
          //   display: "flex",
          alignItems: value as string,
        },
      })
    );
  };

  return (
    <TextAlignBlock
      title="Horizontal Align"
      activeAlign={(styles.alignItems || alignList[0].id) as string}
      alignList={alignList}
      handleChange={handleAlignItems}
    />
  );
};

export default HorizontalAlign;
