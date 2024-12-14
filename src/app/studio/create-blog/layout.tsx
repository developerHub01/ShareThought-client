import CreateBlogPostProvider from "@/redux/providers/CreateBlogPostProvider";
import React from "react";

interface CreateBlogLayoutProps {
  children: React.ReactNode;
}

const CreateBloglayout = ({ children }: CreateBlogLayoutProps) => {
  return <CreateBlogPostProvider>{children}</CreateBlogPostProvider>;
};

export default CreateBloglayout;
