import { BlogStateInterface } from "@/redux/features/builders/blogBuilderSlice";
import React from "react";
import BlockDecision from "@/components/post/components/BlockDecision";

const Post = ({ title, content, components, metaData }: BlogStateInterface) => {
  return (
    <div className="w-full">
      <div className="w-full max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-primary">
          {title || "Dummy Blog Title"}
        </h1>

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
