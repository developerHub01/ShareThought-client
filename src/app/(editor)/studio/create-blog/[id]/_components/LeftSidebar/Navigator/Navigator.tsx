"use client";

import React, { memo } from "react";
import ContentWrapper from "@/app/(editor)/studio/create-blog/[id]/_components/LeftSidebar/ContentWrapper";
import { useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import Component from "@/app/(editor)/studio/create-blog/[id]/_components/LeftSidebar/Navigator/Component";
import { selectBlogContent } from "@/redux/features/builders/selectors";
import useGetComponentFullPath from "@/hooks/editor/use-get-component-full-path";
import FocusTrap from "@/components/wrappers/FocusTrap";

interface NavigatorProps {
  onClose?: () => void;
}

const selectorExclude = ["button", "[href]", "input", "select", "textarea"];

const Navigator = memo(({ onClose }: NavigatorProps) => {
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return;

  const content = useAppSelector((state) => selectBlogContent(state, blogId));

  const activeFullPath = useGetComponentFullPath(blogId);

  return (
    <ContentWrapper id="navigator" label="Navigator">
      <FocusTrap
        onClose={onClose}
        selectorExclude={selectorExclude}
        reCalculateable={true}
      >
        <div className="p-1">
          {content.map((id: string) => {
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
        </div>
      </FocusTrap>
    </ContentWrapper>
  );
});

export default Navigator;
