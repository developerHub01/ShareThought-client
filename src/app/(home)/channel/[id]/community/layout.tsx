import React from "react";

interface CommunityPostsLayoutProps {
  children: React.ReactNode;
}
const CommunityPostsLayout = ({ children }: CommunityPostsLayoutProps) => {
  return (
    <section className="w-full py-3 flex flex-col gap-3">{children}</section>
  );
};

export default CommunityPostsLayout;
