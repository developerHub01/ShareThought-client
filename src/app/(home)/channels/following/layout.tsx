import FollowingChannelCard from "@/components/cards/channel/FollowingChannelCard";
import Heading_v1 from "@/components/headings/Heading_v1";
import PageHeadingWrapper from "@/components/headings/PageHeadingWrapper";
import React from "react";

interface FollowingChannelsLayoutProps {
  children: React.ReactNode;
}

const FollowingChannelsLayout = ({
  children,
}: FollowingChannelsLayoutProps) => {
  return (
    <section className="mx-auto w-full max-w-7xl pb-5">
      <PageHeadingWrapper>
        <Heading_v1>My Following Channels</Heading_v1>
      </PageHeadingWrapper>
      <div>{children}</div>
    </section>
  );
};

export default FollowingChannelsLayout;
