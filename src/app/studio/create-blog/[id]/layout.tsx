import React from "react";
import EditorProvider from "@/app/studio/create-blog/[id]/_components/EditorProvider";

interface CreateComponentCanvasLayoutProps {
  children: React.ReactNode;
}

const CreateComponentCanvasLayout = ({
  children,
}: CreateComponentCanvasLayoutProps) => {
  return <EditorProvider>{children}</EditorProvider>;
};

export default CreateComponentCanvasLayout;
