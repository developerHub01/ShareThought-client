import MyChannelCard from "@/components/cards/channel/MyChannelCard";
import React from "react";
import Heading_v1 from "@/components/headings/Heading_v1";
import PageHeadingWrapper from "@/components/headings/PageHeadingWrapper";
import CreateChannelPopover from "@/app/(home)/channels/my/_components/CreateChannel/CreateChannelPopover";
import CreateChannelButton from "@/app/(home)/channels/my/_components/CreateChannel/CreateChannelButton";

const MyChannels = () => {
  return (
    <section className="mx-auto w-full max-w-7xl pb-5">
      <PageHeadingWrapper>
        <Heading_v1>My Channels</Heading_v1>
        <CreateChannelButton />
      </PageHeadingWrapper>
      <CreateChannelPopover />
      <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array(20)
          .fill(0)
          .map((_, index) => (
            <MyChannelCard key={index} />
          ))}
      </div>
    </section>
  );
};

export default MyChannels;
