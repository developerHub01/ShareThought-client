import React from "react";
import EditorPreviewProvider from "@/app/(editor)/studio/create-blog/[id]/_context/Preview/EditorPreviewProvider";
import PreviewPopover from "@/app/(editor)/studio/create-blog/[id]/_components/Preview/PreviewPopover";

const EditorPreview = () => {
  return (
    <EditorPreviewProvider>
      <PreviewPopover />
    </EditorPreviewProvider>
  );
};

export default EditorPreview;
