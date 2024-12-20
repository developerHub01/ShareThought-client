import type { Metadata } from "next";
import { ReactNode } from "react";
import ChannelOverview_v1 from "@/app/(home)/channel/[id]/_components/ChannelOverview/ChannelOverview_v1";
import MainWrapper from "@/components/wrappers/MainWrapper";

export const metadata: Metadata = {
  title: "Channel | Share Thought",
  description: "Share Thought | Channel",
};

const ChannelLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <MainWrapper className="max-w-7xl flex flex-col gap-3">
      <ChannelOverview_v1 direction="left" />
      {children}
    </MainWrapper>
  );
};

export default ChannelLayout;
