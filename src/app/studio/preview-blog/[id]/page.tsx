"use client";

import React from "react";
import { useParams } from "next/navigation";

const CreateBlogPostPage = () => {
  const params = useParams<{ id: string }>();

  return (
    <section className="mx-auto w-full max-w-7xl">
      <h1 className="text-4xl font-bold text-slate-900 pb-4">
        Create Blog Post
      </h1>
    </section>
  );
};

export default CreateBlogPostPage;
