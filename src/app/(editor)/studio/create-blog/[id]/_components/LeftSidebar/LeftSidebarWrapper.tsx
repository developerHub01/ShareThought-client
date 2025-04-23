import React from "react";
import LeftSidebarProvider from "@/app/(editor)/studio/create-blog/[id]/_context/LeftSidebar/LeftSidebarProvider";
import LeftSidebar from "@/app/(editor)/studio/create-blog/[id]/_components/LeftSidebar/LeftSidebar";
// import EditorPreview from "@/app/(editor)/studio/create-blog/[id]/_components/Preview/EditorPreview";

const LeftSidebarWrapper = () => {
  return (
    <LeftSidebarProvider>
      <LeftSidebar />
      {/* all drawer and other stuffs */}
      {/* <EditorPreview /> */}
    </LeftSidebarProvider>
  );
};

export default LeftSidebarWrapper;
