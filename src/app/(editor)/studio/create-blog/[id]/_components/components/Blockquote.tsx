"use client";

import { BlockquoteInterface } from "@/redux/features/builders/blogBuilderSlice";
import { selectBlogComponentById } from "@/redux/features/builders/selectors";
import { useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import BlockquoteComponent from "@/components/ui/blockquote";
import React from "react";

interface BlockquoteProps {
  id: string;
  parentId?: string;
}

const Blockquote = ({ id, parentId, ...props }: BlockquoteProps) => {
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return null;

  const component = useAppSelector((state) =>
    selectBlogComponentById(state, blogId, id)
  );

  if (!component || component.type !== "blockquote" || !component?.children)
    return null;

  const blockquoteData = component.children as BlockquoteInterface;

  return <BlockquoteComponent {...blockquoteData} />;
};

export default Blockquote;
