import React from "react";
import CommunityPostContent from "@/components/cards/communityPost/utilityComponents/CommunityPostContent";
import CommunityInteraction from "@/components/cards/communityPost/utilityComponents/CommunityInteraction";
import CommunitPostWrapper from "@/components/cards/communityPost/utilityComponents/CommunitPostWrapper";
import CommunityPostPoll from "@/components/cards/communityPost/utilityComponents/CommunityPostPoll";
import { TCommunityPostType } from "@/types";
import CommunityPostImage from "@/components/cards/communityPost/utilityComponents/CommunityPostImage";
import CommunityPostQuiz from "./utilityComponents/CommunityPostQuiz";
import CommunityPostShare from "./utilityComponents/CommunityPostShare";

const CommunityPost = ({ postType }: { postType: TCommunityPostType }) => {
  return (
    <CommunitPostWrapper>
      <CommunityPostContent />
      {postType === "IMAGE" ? (
        <div className="w-full py-1">
          <CommunityPostImage />
        </div>
      ) : postType === "QUIZ" ? (
        <div className="w-full py-1">
          <CommunityPostQuiz />
        </div>
      ) : postType === "POST_SHARE" ? (
        <div className="w-full py-1">
          <CommunityPostShare />
        </div>
      ) : postType === "POLL"? (
        <div className="w-full py-1">
          <CommunityPostPoll />
        </div>
     ): (
      <div className="w-full py-1">
        <CommunityPostPoll />
      </div>
    ) 
      }
      <CommunityInteraction />
    </CommunitPostWrapper>
  );
};

export default CommunityPost;
