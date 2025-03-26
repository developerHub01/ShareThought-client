"use client";

import React, { memo } from "react";
import TextAlignBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/TextAlignBlock";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { LeftAlignIcon, RightAlignIcon, CenterAlignIcon } from "@/lib/icons";
import {
  flexAlignType,
  setAlignment,
} from "@/redux/features/builders/blogBuilderSlice";
import {
  selectBlogActiveBlock,
  selectBlogStylesById,
} from "@/redux/features/builders/selectors";

const alignList = [
  {
    id: "flex-start",
    label: "Left",
    Icon: LeftAlignIcon,
  },
  {
    id: "center",
    label: "Center",
    Icon: CenterAlignIcon,
  },
  {
    id: "flex-end",
    label: "Right",
    Icon: RightAlignIcon,
  },
];

const AlignmentProperty = memo(() => {
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

  const handleChangeAlign = (value: string) => {
    dispatch(
      setAlignment({
        blogId,
        activeBlockId: activeBlock,
        alignment: value as flexAlignType,
      })
    );
  };

  return (
    <TextAlignBlock
      title="Align"
      activeAlign={(styles?.justifyContent as flexAlignType) ?? alignList[0].id}
      handleChange={handleChangeAlign}
      alignList={alignList}
    />
  );
});

export default AlignmentProperty;
