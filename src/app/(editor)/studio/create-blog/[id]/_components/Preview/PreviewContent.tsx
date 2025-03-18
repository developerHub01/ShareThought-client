"use client";

import { useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import React, { memo } from "react";
import Post from "@/components/post/Post";

const PreviewContent = memo(() => {
  const { id: postId } = useParams<{ id: string }>();

  const blogData = useAppSelector(
    (state) => state?.blogBuilder?.blogs?.[postId]
  );

  if (!blogData) return null;

  return <Post {...blogData} />;
});

export default PreviewContent;
