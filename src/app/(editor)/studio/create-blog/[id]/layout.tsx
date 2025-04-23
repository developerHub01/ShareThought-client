import React from "react";
import EditorProvider from "@/app/(editor)/studio/create-blog/[id]/_context/EditorProvider";
import Navbar from "@/app/(editor)/studio/_components/Navbar";
import EditorContainerWrapper from "@/app/(editor)/studio/create-blog/[id]/_components/EditorContainerWrapper";
import PreventUnsaveClose from "@/app/(editor)/studio/create-blog/[id]/_components/BrowserInteraction/PreventUnsaveClose";

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
      <PreventUnsaveClose />
    </EditorProvider>
  );
};

export default CreateComponentCanvasLayout;
