import React from "react";
import Heading_v1 from "@/components/headings/Heading_v1";
import PageHeadingWrapper from "@/components/headings/PageHeadingWrapper";
import CreateChannelPopover from "@/app/(home)/channels/my/_components/CreateChannel/CreateChannelPopover";
import CreateChannelButton from "@/app/(home)/channels/my/_components/CreateChannel/CreateChannelButton";
import CreateChannelProvider from "@/redux/providers/CreateChannelProvider";

interface MyChannelsLayoutProps {
  children: React.ReactNode;
}

const MyChannelsLayout = ({ children }: MyChannelsLayoutProps) => {
  return (
    <CreateChannelProvider>
      <section className="mx-auto w-full max-w-7xl pb-5">
        <PageHeadingWrapper>
          <Heading_v1>My Channels</Heading_v1>
          <CreateChannelButton />
        </PageHeadingWrapper>
        <CreateChannelPopover />
        <div>{children}</div>
      </section>
    </CreateChannelProvider>
  );
};

export default MyChannelsLayout;
