"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  BlockquoteInterface,
  changeBlockquoteContent,
  updateComponentText,
} from "@/redux/features/builders/blogBuilderSlice";
import PropertyWrapper_v1 from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/PropertyWrapper_v1";
import {
  selectBlogActiveBlock,
  selectBlogComponentById,
} from "@/redux/features/builders/selectors";
import InputWithAttachLebel from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/InputWithAttachLebel";

const BlockquoteQuote = () => {
  const [author, setAuthor] = useState("");
  const { id: blogId } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  if (!blogId) return null;

  const activeBlock = useAppSelector((state) =>
    selectBlogActiveBlock(state, blogId)
  );
  const activeComponent = useAppSelector((state) =>
    selectBlogComponentById(state, blogId, activeBlock)
  );

  useEffect(() => {
    const quoteData = activeComponent?.children as BlockquoteInterface;
    if (
      !activeBlock ||
      !activeComponent ||
      activeComponent.type !== "blockquote" ||
      author === quoteData?.author
    )
      return;

    setAuthor(quoteData?.author ?? "");
  }, [activeBlock]);

  if (!activeBlock || !activeComponent || activeComponent.type !== "blockquote")
    return null;

  const handleChange = useCallback((value: string) => {
    setAuthor(value);
  }, []);

  const handleBlur = useCallback(
    (author: string) => {
      dispatch(
        changeBlockquoteContent({
          blogId,
          id: activeBlock,
          blockquote: {
            author,
          },
        })
      );
    },
    [dispatch, activeBlock, blogId]
  );

  return (
    <PropertyWrapper_v1>
      <InputWithAttachLebel
        label="Author"
        placeholder="Blockquote author"
        value={author}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </PropertyWrapper_v1>
  );
};

export default BlockquoteQuote;
