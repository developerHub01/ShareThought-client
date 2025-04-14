"use client";

import { selectCommunityPostType } from "@/redux/features/create-community-post/selectors";
import { useAppSelector } from "@/redux/hooks";
import React, { memo } from "react";
import ImageCanvas from "@/app/studio/create-community-post/_components/ContextBasedCanvas/ImageCanvas/ImageCanvas";

const ContextBasedCanvas = memo(() => {
  const postType = useAppSelector((state) => selectCommunityPostType(state));

  if (!postType || postType === "TEXT") return null;

  return <>{postType === "IMAGE" && <ImageCanvas />}</>;
});

export default ContextBasedCanvas;
