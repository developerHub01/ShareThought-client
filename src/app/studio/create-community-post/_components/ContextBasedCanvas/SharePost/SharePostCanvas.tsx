"use client";

import React, { memo } from "react";
import SharePostInput from "@/app/studio/create-community-post/_components/ContextBasedCanvas/SharePost/SharePostInput";
import PostList from "@/app/studio/create-community-post/_components/ContextBasedCanvas/SharePost/PostList";
import SharePostSelect from "@/app/studio/create-community-post/_components/ContextBasedCanvas/SharePost/SharePostSelect";

const SharePostCanvas = memo(() => {
  return (
    <div className="w-full h-full p-2 flex flex-col gap-5">
      <SharePostInput />
      <PostList />
      <SharePostSelect />
    </div>
  );
});

export default SharePostCanvas;
