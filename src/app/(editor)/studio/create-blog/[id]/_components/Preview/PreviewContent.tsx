"use client";

import { useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import React, { memo } from "react";
import PreviewHeading from "@/app/(editor)/studio/create-blog/[id]/_components/Preview/PreviewHeading";
import PreviewBanner from "@/app/(editor)/studio/create-blog/[id]/_components/Preview/PreviewBanner";
import BlockDecision from "@/app/(editor)/studio/create-blog/[id]/_components/Preview/BlockDecision";

const PreviewContent = memo(() => {
  const { id: blogId } = useParams<{ id: string }>();

  const blogData = useAppSelector(
    (state) => state?.blogBuilder?.blogs?.[blogId]
  );

  if (!blogData) return null;

  const { title, content, metaData, components } = blogData;
  const bannerImage = blogData.metaData?.imgLinks?.banner ?? "";

  return (
    <div className="w-full">
      <div className="w-full max-w-3xl mx-auto">
        <PreviewHeading title={title} />
        <PreviewBanner banner={bannerImage} />

        <section className="w-full h-full py-5 flex flex-col">
          {content.map((id) => (
            <BlockDecision
              key={id}
              id={id}
              content={content}
              components={components}
              metaData={metaData}
            />
          ))}
        </section>
      </div>
    </div>
  );
});

export default PreviewContent;
