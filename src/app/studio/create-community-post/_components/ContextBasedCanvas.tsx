"use client";

import { selectCommunityPostType } from "@/redux/features/create-community-post/selectors";
import { useAppSelector } from "@/redux/hooks";
import React, { memo } from "react";
import ImageCanvas from "@/app/studio/create-community-post/_components/ContextBasedCanvas/ImageCanvas/ImageCanvas";
import SharePostCanvas from "@/app/studio/create-community-post/_components/ContextBasedCanvas/SharePost/SharePostCanvas";
import CanvasWrapper from "@/app/studio/create-community-post/_components/ContextBasedCanvas/CanvasWrapper";
import PollWrapper from "@/app/studio/create-community-post/_components/ContextBasedCanvas/Poll/PollWrapper";

const ContextBasedCanvas = memo(() => {
  const postType = useAppSelector((state) => selectCommunityPostType(state));

  if (!postType || postType === "TEXT") return null;

  return (
    <CanvasWrapper>
      {postType === "IMAGE" && <ImageCanvas />}
      {postType === "POST_SHARE" && <SharePostCanvas />}
      {["POLL", "POLL_WITH_IMAGE"].includes(postType) && <PollWrapper />}
    </CanvasWrapper>
  );
});

export default ContextBasedCanvas;
