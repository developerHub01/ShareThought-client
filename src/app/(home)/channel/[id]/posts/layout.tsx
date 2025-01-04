import React from "react";
import OrderByMenu from "@/app/(home)/channel/[id]/posts/_components/OrderByMenu";

interface PostsLayoutProps {
  children: React.ReactNode;
}
const PostsLayout = ({ children }: PostsLayoutProps) => {
  return (
    <section className="w-full py-3 flex flex-col gap-3">
      <OrderByMenu />
      {children}
    </section>
  );
};

export default PostsLayout;
