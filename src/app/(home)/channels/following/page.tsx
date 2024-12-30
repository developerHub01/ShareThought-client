import FollowingChannelCard from "@/components/cards/channel/FollowingChannelCard";
import React from "react";

const FollowingChannels = () => {
  return (
    <div className="w-full grid lg:grid-cols-2 gap-5">
      {Array(20)
        .fill(0)
        .map((_, index) => (
          <FollowingChannelCard key={index} />
        ))}
    </div>
  );
};

export default FollowingChannels;
