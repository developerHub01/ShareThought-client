import type { Metadata } from "next";
import { ReactNode } from "react";
import ChannelOverview_v1 from "@/app/(home)/channel/[id]/_components/ChannelOverview/ChannelOverview_v1";
import ChannelMenu from "@/app/(home)/channel/[id]/_components/ChannelMenu/ChannelMenu";

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
    <section className="w-full max-w-7xl flex flex-col gap-3 pb-5 mx-auto">
      <ChannelOverview_v1 direction="left" />
      <ChannelMenu />
      {children}
    </section>
  );
};

export default ChannelLayout;
