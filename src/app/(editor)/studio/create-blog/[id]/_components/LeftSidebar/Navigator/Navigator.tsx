"use client";

import ContentWrapper from "@/app/(editor)/studio/create-blog/[id]/_components/LeftSidebar/ContentWrapper";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import Component from "@/app/(editor)/studio/create-blog/[id]/_components/LeftSidebar/Navigator/Component";

const Navigator = () => {
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return;

  const { content } = useAppSelector(
    (state) => state.blogBuilder.blogs[blogId] || {}
  );

  return (
    <ContentWrapper id="navigator" label="Navigator">
  
        {content.map((id) => (
          <Component key={id} id={id} />
        ))}
    </ContentWrapper>
  );
};

export default Navigator;
