import React from "react";
import EditorProvider from "@/app/(editor)/studio/create-blog/[id]/_context/EditorProvider";
import Navbar from "@/app/(editor)/studio/_components/Navbar";
import EditorContainerWrapper from "./_components/EditorContainerWrapper";

interface CreateComponentCanvasLayoutProps {
  children: React.ReactNode;
}

const CreateComponentCanvasLayout = ({
  children,
}: CreateComponentCanvasLayoutProps) => {
  return (
    <EditorProvider>
      <EditorContainerWrapper>
        <Navbar />
        {children}
      </EditorContainerWrapper>
    </EditorProvider>
  );
};

export default CreateComponentCanvasLayout;
