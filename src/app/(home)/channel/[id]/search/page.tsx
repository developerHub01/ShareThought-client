import HistoryPostCard from "@/components/cards/post/HistoryPostCard";
import React from "react";

const PostsPage = () => {
  return (
    <div className="grid gap-5">
      {Array(20)
        .fill(0)
        .map((_, index) => (
          <HistoryPostCard key={index} />
        ))}
    </div>
  );
};

export default PostsPage;
