import React from "react";
import CreateBlogPostProvider from "@/redux/providers/CreateBlogPostProvider";

interface CreateBlogLayoutProps {
  children: React.ReactNode;
}

const CreateBloglayout = ({ children }: CreateBlogLayoutProps) => {
  return <CreateBlogPostProvider>{children}</CreateBlogPostProvider>;
};

export default CreateBloglayout;
