"use client";

import React, { memo } from "react";
import { useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import {
  selectBlogActiveBlock,
  selectBlogComponentById,
} from "@/redux/features/builders/selectors";
import ComponentDetail from "@/app/(editor)/studio/create-blog/[id]/_components/LeftSidebar/Navigator/ComponentDetail";

interface ComponentProps {
  id: string;
  activeFullPath?: Array<string>;
}

const Component = memo(({ id, activeFullPath }: ComponentProps) => {
  const { id: blogId } = useParams<{ id: string }>();
  if (!blogId) return null;

  const activeBlock =
    useAppSelector((state) => selectBlogActiveBlock(state, blogId)) ?? "";
  const activeComponent = useAppSelector((state) =>
    selectBlogComponentById(state, blogId, id)
  );

  if (!activeComponent) return null;

  return <ComponentDetail {...activeComponent} activeFullPath={activeFullPath} activeBlock={activeBlock} />;
});

export default Component;
