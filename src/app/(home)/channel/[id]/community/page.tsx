import CommunityPost from "@/components/cards/communityPost/CommunityPost";
import React from "react";

const CommunityPostsPage = () => {
  return (
    <section className="w-full flex flex-col gap-5 items-center">
      {Array(20)
        .fill(0)
        .map((_, index) => (
          <CommunityPost postType="POLL" key={index} />
        ))}
    </section>
  );
};

export default CommunityPostsPage;
