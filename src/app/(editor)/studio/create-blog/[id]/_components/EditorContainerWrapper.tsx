"use client";

import React from "react";
import { useEditor } from "@/app/(editor)/studio/create-blog/[id]/_context/EditorProvider";

const EditorContainerWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { containerRef } = useEditor();
  return (
    <section
      className="h-screen overflow-hidden flex flex-col bg-primary-foreground"
      ref={containerRef}
    >
      {children}
    </section>
  );
};

export default EditorContainerWrapper;
