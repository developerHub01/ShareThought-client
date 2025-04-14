import React from "react";
import PostTextField from "@/app/studio/create-community-post/_components/PostTextField";
import PostFooterAction from "@/app/studio/create-community-post/_components/PostFooterAction";
import ContextBasedCanvas from "@/app/studio/create-community-post/_components/ContextBasedCanvas";

const CreateCommunityPostPage = () => {
  return (
    <section className="mx-auto w-full max-w-7xl">
      <section className="max-w-3xl shadow-xl border rounded-sm p-4 flex flex-col gap-3">
        <PostTextField />
        <ContextBasedCanvas />
        <PostFooterAction />
      </section>
    </section>
  );
};

export default CreateCommunityPostPage;
