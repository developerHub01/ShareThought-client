import React from "react";
import CreateCommunityPostProvider from "@/redux/providers/CreateCommunityPostProvider";
import ImagePostProvider from "@/app/studio/create-community-post/_context/ImagePostProvider";
import SharePostProvider from "@/app/studio/create-community-post/_context/SharePostProvider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Community Post | Share Thought",
  description: "Create community post for your channel",
};

interface CreateCommunityPostLayoutProps {
  children: React.ReactNode;
}

const CreateCommunityPostlayout = ({
  children,
}: CreateCommunityPostLayoutProps) => {
  return (
    <CreateCommunityPostProvider>
      <ImagePostProvider>
        <SharePostProvider>{children}</SharePostProvider>
      </ImagePostProvider>
    </CreateCommunityPostProvider>
  );
};

export default CreateCommunityPostlayout;
