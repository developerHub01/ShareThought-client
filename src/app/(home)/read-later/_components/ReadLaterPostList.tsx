import PostCategoryCard from "@/components/cards/post/PostCategoryCard";
import React from "react";

const ReadLaterPostList = () => {
  return (
    <div className="w-full flex flex-col gap-5">
      {Array(20)
        .fill(0)
        .map((_, index) => (
          <PostCategoryCard key={index} isMyCategory={true} />
        ))}
    </div>
  );
};

export default ReadLaterPostList;
