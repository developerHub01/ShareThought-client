"use client";

import React, { memo, useCallback } from "react";
import SelectBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/SelectBlock";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import {
  BlockquoteInterface,
  changeBlockquoteContent,
} from "@/redux/features/builders/blogBuilderSlice";
import {
  selectBlogActiveBlock,
  selectBlogComponentById,
} from "@/redux/features/builders/selectors";
import { BlockquoteVariantType } from "@/components/ui/blockquote";

const variantList = [
  "v1",
  "v2",
  "v3",
  "v4",
  "v5",
  "v6",
  "v7",
  "v8",
  "v9",
  "v10",
].map((id) => ({
  id,
  label: id.replace("v", "Variant "),
}));

const BlockquoteVariant = memo(() => {
  const dispatch = useAppDispatch();
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return null;

  const activeBlock = useAppSelector((state) =>
    selectBlogActiveBlock(state, blogId)
  );
  const component = useAppSelector((state) =>
    selectBlogComponentById(state, blogId, activeBlock)
  );

  if (!blogId || !activeBlock || !component || component.type !== "blockquote")
    return null;

  const activeVarient = (component.children as BlockquoteInterface)?.variant;

  const handleChange = useCallback(
    (variant: string) => {
      dispatch(
        changeBlockquoteContent({
          blogId,
          id: activeBlock,
          blockquote: {
            variant: variant as BlockquoteVariantType,
          },
        })
      );
    },
    [dispatch, activeBlock, blogId]
  );

  return (
    <SelectBlock
      label="Blockquote Varient"
      activeValue={activeVarient ?? variantList[0].id}
      itemList={variantList}
      handleChange={handleChange}
    />
  );
});

export default BlockquoteVariant;
