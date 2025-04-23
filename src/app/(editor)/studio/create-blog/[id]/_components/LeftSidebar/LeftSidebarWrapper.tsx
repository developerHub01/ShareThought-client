import React from "react";
import LeftSidebarProvider from "@/app/(editor)/studio/create-blog/[id]/_context/LeftSidebar/LeftSidebarProvider";
import LeftSidebar from "@/app/(editor)/studio/create-blog/[id]/_components/LeftSidebar/LeftSidebar";

const LeftSidebarWrapper = () => {
  return (
    <LeftSidebarProvider>
      <LeftSidebar />
    </LeftSidebarProvider>
  );
};

export default LeftSidebarWrapper;
