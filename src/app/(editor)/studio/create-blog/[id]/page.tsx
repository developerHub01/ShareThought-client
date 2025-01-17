"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { createBlog } from "@/redux/features/builders/blogBuilderSlice";
import EditorCanvas from "@/app/(editor)/studio/create-blog/[id]/_components/EditorCanvas";
import EditorPreview from "@/app/(editor)/studio/create-blog/[id]/_components/EditorPreview";
import PreviewButton from "@/app/(editor)/studio/create-blog/[id]/_components/PreviewButton";

const CreateBlogPostPage = () => {
  const { id: postId } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const blogsData = useAppSelector((state) => state?.blogBuilder?.blogs);

  useEffect(() => {
    if (!postId) return;

    if (!blogsData[postId]) {
      dispatch(createBlog(postId));
    }
  }, [postId]);

  if (!blogsData) return null;

  const blogData = blogsData[postId];

  return (
    <section className="h-full overflow-hidden">
      <>
        {blogData?.editorOrPreview !== "preview" ? (
          <EditorCanvas />
        ) : (
          <EditorPreview />
        )}
      </>
      {/* <PreviewButton /> */}
    </section>
  );
};

export default CreateBlogPostPage;
