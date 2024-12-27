import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";
import Follower from "@/app/(home)/channel/[id]/_components/Followers/Follower";

const FollowerChannel = () => {
  return (
    <ScrollArea className="w-full h-full">
      <div className="">
        {Array(15)
          .fill(0)
          .map((_, index) => (
            <Follower key={index} />
          ))}
      </div>
    </ScrollArea>
  );
};

export default FollowerChannel;
