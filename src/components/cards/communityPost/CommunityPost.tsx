import React from "react";
import CommunityPostContent from "./utilityComponents/CommunityPostContent";
import CommunityInteraction from "./utilityComponents/CommunityInteraction";
import CommunitPostWrapper from "./utilityComponents/CommunitPostWrapper";

const CommunityPost = () => {
  return (
    <CommunitPostWrapper>
      <CommunityPostContent />
      <CommunityInteraction />
    </CommunitPostWrapper>
  );
};

export default CommunityPost;
