"use client";

import ContentWrapper from "@/app/(editor)/studio/create-blog/[id]/_components/LeftSidebar/ContentWrapper";
import { useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import Component from "@/app/(editor)/studio/create-blog/[id]/_components/LeftSidebar/Navigator/Component";
import { selectBlogContent } from "@/redux/features/builders/selectors";
import React from "react";

const Navigator = () => {
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return;

  // const { content } = useAppSelector(
  //   (state) => state.blogBuilder.blogs[blogId] || {}
  // );
  const content = useAppSelector((state) =>
    selectBlogContent(state, blogId)
  );

  return (
    <ContentWrapper id="navigator" label="Navigator">
      {content.map((id) => (
        <React.Fragment key={id}>
          {/* <Component key={id} id={id} /> */}
        </React.Fragment>
      ))}
    </ContentWrapper>
  );
};

export default Navigator;
