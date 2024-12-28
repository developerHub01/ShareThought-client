import MyChannelCard from "@/components/cards/channel/MyChannelCard";
import { Button } from "@/components/ui/button";
import React from "react";
import { Plus as CreateIcon } from "lucide-react";
import Heading_v1 from "@/components/headings/Heading_v1";
import PageHeadingWrapper from "@/components/headings/PageHeadingWrapper";

const MyChannels = () => {
  return (
    <section className="mx-auto w-full max-w-7xl">
      <PageHeadingWrapper>
        <Heading_v1>My Channels</Heading_v1>
        <Button size={"sm"}>
          <CreateIcon size={16} /> Create Channel
        </Button>
      </PageHeadingWrapper>

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
