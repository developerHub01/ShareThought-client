"use client";

import React, { CSSProperties, memo } from "react";
import TextAlignBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/TextAlignBlock";
import { PilcrowRight as LRTIcon, PilcrowLeft as RTLIcon } from "lucide-react";
import {
  TextDirectionType,
  addStyle,
} from "@/redux/features/builders/blogBuilderSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import {
  selectBlogActiveBlock,
  selectBlogStylesById,
} from "@/redux/features/builders/selectors";

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

const TextDirectionProperty = memo(() => {
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

  console.log("Re-run direction property===========");

  const handleChangeAlign = (value: string) => {
    dispatch(
      addStyle({
        blogId,
        activeBlockId: activeBlock,
        styles: {
          direction: value as TextDirectionType,
        },
      })
    );
  };

  return (
    <TextAlignBlock
      title="Text Direction"
      activeAlign={styles?.direction ?? alignList[0].id}
      handleChange={handleChangeAlign}
      alignList={alignList}
    />
  );
});

export default TextDirectionProperty;
