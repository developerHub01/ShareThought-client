import React from "react";
import EditorCanvas from "@/app/(editor)/studio/create-blog/[id]/_components/EditorCanvas";
import ClientBlogEditorWrapper from "@/app/(editor)/studio/create-blog/[id]/_components/ClientBlogEditorWrapper";

const CreateBlogPostPage = () => {
  return (
    <section className="w-full h-full overflow-hidden relative">
      <ClientBlogEditorWrapper>
        <EditorCanvas />
      </ClientBlogEditorWrapper>
    </section>
  );
};

export default CreateBlogPostPage;
