import { BlogStateInterface } from "@/redux/features/builders/blogBuilderSlice";
import React from "react";
import BlockDecision from "@/components/post/components/BlockDecision";
import Image from "next/image";

const Post = ({ title, content, components, metaData }: BlogStateInterface) => {
  const bannerImage = metaData?.imgLinks?.banner || "";

  return (
    <div className="w-full">
      <div className="w-full max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-3xl font-bold text-primary pb-4">
          {title || "Dummy Blog Title"}
        </h1>
        {bannerImage && (
          <Image
            width={800}
            height={350}
            alt="banner title"
            src={bannerImage}
            className="w-full h-full object-cover mb-4"
          />
        )}

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
};

export default Post;
