import React from "react";
import EditorProvider from "@/app/(editor)/studio/create-blog/[id]/_context/EditorProvider";

interface CreateComponentCanvasLayoutProps {
  children: React.ReactNode;
}

const CreateComponentCanvasLayout = ({
  children,
}: CreateComponentCanvasLayoutProps) => {
  return <EditorProvider>{children}</EditorProvider>;
};

export default CreateComponentCanvasLayout;
