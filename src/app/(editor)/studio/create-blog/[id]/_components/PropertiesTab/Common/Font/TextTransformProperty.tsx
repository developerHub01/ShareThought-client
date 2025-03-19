"use client";

import React, { CSSProperties, memo } from "react";
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
import {
  selectBlogActiveBlock,
  selectBlogStylesById,
} from "@/redux/features/builders/selectors";

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

const TextTransformProperty = memo(() => {
  const dispatch = useAppDispatch();
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return null;

  const activeBlock = useAppSelector((state) =>
    selectBlogActiveBlock(state, blogId)
  );
  const styles = (useAppSelector((state) =>
    selectBlogStylesById(state, blogId, activeBlock)
  ) ?? {}) as CSSProperties;

  if (!blogId || !activeBlock) return null;

  console.log("Re-run textTransform property===========");

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
      activeAlign={styles?.textTransform || "none"}
      handleChange={handleChangeTransform}
      alignList={transformList}
    />
  );
});

export default TextTransformProperty;
