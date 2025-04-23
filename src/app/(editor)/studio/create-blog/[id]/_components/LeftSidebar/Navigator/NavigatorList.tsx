"use client";

import React from "react";
import { useParams } from "next/navigation";
import useGetComponentFullPath from "@/hooks/editor/use-get-component-full-path";
import { selectBlogContent } from "@/redux/features/builders/selectors";
import { useAppSelector } from "@/redux/hooks";
import Component from "@/app/(editor)/studio/create-blog/[id]/_components/LeftSidebar/Navigator/Component";

const NavigatorList = () => {
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return;
  const content = useAppSelector((state) => selectBlogContent(state, blogId));

  const activeFullPath = useGetComponentFullPath(blogId);

  return (
    <div className="p-1">
      {!content.length && (
        <div className="p-2 text-center text-lg font-semibold capitalize border-2 border-dashed rounded-sm">
          <p>No blocks added</p>
        </div>
      )}

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
  );
};

export default NavigatorList;
