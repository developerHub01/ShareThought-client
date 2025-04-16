import React from "react";
import CreateCommunityPostProvider from "@/redux/providers/CreateCommunityPostProvider";
import ImagePostProvider from "@/app/studio/create-community-post/_context/ImagePostProvider";

interface CreateCommunityPostLayoutProps {
  children: React.ReactNode;
}

const CreateCommunityPostlayout = ({
  children,
}: CreateCommunityPostLayoutProps) => {
  return (
    <CreateCommunityPostProvider>
      <ImagePostProvider>{children}</ImagePostProvider>
    </CreateCommunityPostProvider>
  );
};

export default CreateCommunityPostlayout;
