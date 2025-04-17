"use client";

import React, { memo } from "react";
import ChannelPostCard from "@/components/cards/post/ChannelPostCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSharePost } from "@/app/studio/create-community-post/_context/SharePostProvider";
import { cn } from "@/lib/utils";
import NotFound from "@/app/studio/create-community-post/_components/ContextBasedCanvas/SharePost/NotFound";

const PostList = memo(() => {
  const { postList, selectedPostId, handleSelectPost } = useSharePost();

  if (!postList) return null;

  if (Array.isArray(postList) && !postList.length) return <NotFound />;

  return (
    <div className="p-3 bg-accent rounded-sm">
      <ScrollArea className="w-full h-[400px] sm:h-[300px]">
        <div className="w-full grid sm:grid-cols-2 gap-2 p-1">
          {Array(10)
            .fill(0)
            .map((_, id) => (
              <div
                key={id}
                className={cn(
                  "w-full cursor-pointer ring-2 ring-transparent hover:ring-primary",
                  {
                    "ring-2 ring-primary rounded-sm":
                      selectedPostId === String(id),
                  }
                )}
                onClick={() => handleSelectPost(String(id))}
              >
                <ChannelPostCard
                  showThreeDot={false}
                  className="pointer-events-none bg-primary-foreground"
                />
              </div>
            ))}
        </div>
      </ScrollArea>
    </div>
  );
});

export default PostList;
