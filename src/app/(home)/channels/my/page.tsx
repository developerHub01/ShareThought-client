import MyChannelCard from "@/components/cards/channel/MyChannelCard";
import React from "react";

const MyChannels = () => {
  return (
    <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array(20)
        .fill(0)
        .map((_, index) => (
          <MyChannelCard key={index} />
        ))}
    </div>
  );
};

export default MyChannels;
