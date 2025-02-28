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
    <ContentWrapper id="navigator" className="select-none flex flex-col">
      <h4 className="p-2 text-base font-bold">Navigator</h4>
      <ScrollArea className="w-full h-full px-2 text-sm">
        {content.map((id) => (
          <Component key={id} id={id} />
        ))}
      </ScrollArea>
    </ContentWrapper>
  );
};

export default Navigator;
