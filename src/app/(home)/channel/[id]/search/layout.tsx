import SecondarySearchbar from "@/components/Inputs/SecondarySearchbar";
import React from "react";

interface PostsLayoutProps {
  children: React.ReactNode;
}
const PostsLayout = ({ children }: PostsLayoutProps) => {
  return (
    <section className="w-full py-3 flex flex-col gap-5">
      <SecondarySearchbar label="Search posts" />
      {children}
    </section>
  );
};

export default PostsLayout;
