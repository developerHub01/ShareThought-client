"use client";

import React, { memo } from "react";
import PostTypeSelector from "@/app/studio/create-community-post/_components/PostTypeSelector";
import PostSubmitAction from "@/app/studio/create-community-post/_components/PostSubmitAction";
import { useAppSelector } from "@/redux/hooks";
import { selectCommunityPostType } from "@/redux/features/create-community-post/selectors";

const PostFooterAction = memo(() => {
  const postType = useAppSelector((state) => selectCommunityPostType(state));

  return (
    <div className="flex flex-wrap justify-between items-center gap-5">
      {(!postType || postType === "TEXT") && <PostTypeSelector />}
      <PostSubmitAction />
    </div>
  );
});

export default PostFooterAction;
