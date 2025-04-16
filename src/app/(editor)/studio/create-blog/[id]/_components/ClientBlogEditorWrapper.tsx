"use client";

import { createBlog } from "@/redux/features/builders/blogBuilderSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

interface ClientBlogEditorWrapperProps {
  children: React.ReactNode;
}

const ClientBlogEditorWrapper = ({
  children,
}: ClientBlogEditorWrapperProps) => {
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

  return <>{children}</>;
};

export default ClientBlogEditorWrapper;
