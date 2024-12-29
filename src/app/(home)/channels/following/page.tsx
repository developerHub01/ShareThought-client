import FollowingChannelCard from "@/components/cards/channel/FollowingChannelCard";
import Heading_v1 from "@/components/headings/Heading_v1";
import PageHeadingWrapper from "@/components/headings/PageHeadingWrapper";
import React from "react";

const FollowingChannels = () => {
  return (
    <section className="mx-auto w-full max-w-7xl pb-5">
      <PageHeadingWrapper>
        <Heading_v1>My Following Channels</Heading_v1>
      </PageHeadingWrapper>
      <div className="w-full grid lg:grid-cols-2 gap-5">
        {Array(20)
          .fill(0)
          .map((_, index) => (
            <FollowingChannelCard key={index} />
          ))}
      </div>
    </section>
  );
};

export default FollowingChannels;
