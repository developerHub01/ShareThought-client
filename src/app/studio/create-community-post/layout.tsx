import React from "react";
import CreateCommunityPostProvider from "@/redux/providers/CreateCommunityPostProvider";

interface CreateCommunityPostLayoutProps {
  children: React.ReactNode;
}

const CreateCommunityPostlayout = ({
  children,
}: CreateCommunityPostLayoutProps) => {
  return <CreateCommunityPostProvider>{children}</CreateCommunityPostProvider>;
};

export default CreateCommunityPostlayout;
