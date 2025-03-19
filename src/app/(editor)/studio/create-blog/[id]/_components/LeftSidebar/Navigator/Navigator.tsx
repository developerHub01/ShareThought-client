"use client";

import React, { memo } from "react";
import ContentWrapper from "@/app/(editor)/studio/create-blog/[id]/_components/LeftSidebar/ContentWrapper";
import { useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import Component from "@/app/(editor)/studio/create-blog/[id]/_components/LeftSidebar/Navigator/Component";
import { selectBlogContent } from "@/redux/features/builders/selectors";

const Navigator = memo(() => {
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return;

  const content = useAppSelector((state) => selectBlogContent(state, blogId));

  return (
    <ContentWrapper id="navigator" label="Navigator">
      {content.map((id) => (
        <Component key={id} id={id} />
      ))}
    </ContentWrapper>
  );
});

export default Navigator;
