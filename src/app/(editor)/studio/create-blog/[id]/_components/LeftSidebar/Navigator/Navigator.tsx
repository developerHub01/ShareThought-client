"use client";

import React, { memo } from "react";
import ContentWrapper from "@/app/(editor)/studio/create-blog/[id]/_components/LeftSidebar/ContentWrapper";
import { useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import Component from "@/app/(editor)/studio/create-blog/[id]/_components/LeftSidebar/Navigator/Component";
import { selectBlogContent } from "@/redux/features/builders/selectors";
import useGetComponentFullPath from "@/hooks/editor/use-get-component-full-path";

const Navigator = memo(() => {
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return;

  const content = useAppSelector((state) => selectBlogContent(state, blogId));

  const activeFullPath = useGetComponentFullPath(blogId);

  return (
    <ContentWrapper id="navigator" label="Navigator">
      {content.map((id) => {
        return (
          <Component
            key={id}
            id={id}
            {...(activeFullPath[0] === id
              ? {
                  activeFullPath: activeFullPath,
                }
              : {})}
          />
        );
      })}
    </ContentWrapper>
  );
});

export default Navigator;
