"use client";

import React, { memo } from "react";
import { useSharePost } from "@/app/studio/create-community-post/_context/SharePostProvider";
import { CloseIcon } from "@/lib/icons";
import { Button } from "@/components/ui/button";

const SharePostSelect = memo(() => {
  const { selectedPostId, handleSelectPost, handleAddCommunityPostId } =
    useSharePost();

  if (!selectedPostId) return null;

  return (
    <div className="flex items-center gap-2 border-t p-3">
      <Button
        size={"smIcon"}
        variant={"ghost"}
        onClick={() => handleSelectPost("")}
      >
        <CloseIcon size={18} />
      </Button>
      <p className="text-sm text-foreground/50">1 Selected</p>
      <Button className="ml-auto" onClick={handleAddCommunityPostId}>
        Add
      </Button>
    </div>
  );
});

export default SharePostSelect;
