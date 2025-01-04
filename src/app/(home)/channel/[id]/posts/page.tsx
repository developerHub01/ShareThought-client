import ChannelPostCard from "@/components/cards/post/ChannelPostCard";
import PostsWrapper from "@/components/wrappers/PostsWrapper";
import React from "react";

const PostsPage = () => {
  return (
    <PostsWrapper>
      {Array(20)
        .fill(0)
        .map((_, index) => (
          <ChannelPostCard key={index} />
        ))}
    </PostsWrapper>
  );
};

export default PostsPage;
