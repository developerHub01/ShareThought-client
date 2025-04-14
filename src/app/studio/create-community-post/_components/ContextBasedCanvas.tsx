"use client";

import { selectCommunityPostType } from "@/redux/features/create-community-post/selectors";
import { useAppSelector } from "@/redux/hooks";
import React, { memo } from "react";

const ContextBasedCanvas = memo(() => {
  const postType = useAppSelector((state) => selectCommunityPostType(state));

  return <div>ContextBasedCanvas</div>;
});

export default ContextBasedCanvas;
