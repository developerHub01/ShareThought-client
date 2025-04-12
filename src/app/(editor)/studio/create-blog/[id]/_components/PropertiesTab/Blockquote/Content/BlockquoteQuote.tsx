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
import TextareaWithAttachLabel from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/TextareaWithAttachLabel";

const BlockquoteQuote = () => {
  const [quote, setQuote] = useState("");
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
      quote === quoteData?.quote
    )
      return;

    setQuote(quoteData?.quote ?? "");
  }, [activeBlock]);

  if (!activeBlock || !activeComponent || activeComponent.type !== "blockquote")
    return null;

  const handleChange = useCallback((value: string) => {
    setQuote(value);
  }, []);

  const handleBlur = useCallback(
    (quote: string) => {
      console.log("quote", quote);
      dispatch(
        changeBlockquoteContent({
          blogId,
          id: activeBlock,
          blockquote: {
            quote,
          },
        })
      );
    },
    [activeBlock, blogId, dispatch]
  );

  return (
    <PropertyWrapper_v1>
      <TextareaWithAttachLabel
        label="Quote"
        placeholder="Blockquote text..."
        value={quote}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </PropertyWrapper_v1>
  );
};

export default BlockquoteQuote;
