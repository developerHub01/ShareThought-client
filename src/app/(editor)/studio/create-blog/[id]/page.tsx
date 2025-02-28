"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { createBlog } from "@/redux/features/builders/blogBuilderSlice";
import EditorCanvas from "@/app/(editor)/studio/create-blog/[id]/_components/EditorCanvas";

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

  return (
    <section className="w-full h-full overflow-hidden relative">
      <EditorCanvas />
    </section>
  );
};

export default CreateBlogPostPage;
