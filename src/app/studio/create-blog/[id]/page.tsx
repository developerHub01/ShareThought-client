"use client";

import React, { ChangeEvent, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  createBlog,
  updateTitle,
} from "@/redux/features/builders/blogBuilderSlice";
import AddComponentSection from "@/app/studio/create-blog/[id]/_components/AddComponentSection";
import PreviewButton from "@/app/studio/create-blog/[id]/_components/PreviewButton";
import ComponentDialog from "@/app/studio/create-blog/[id]/_components/ComponentDialog";
import EditorSidebar from "@/app/studio/create-blog/[id]/_components/EditorSidebar";
import { AnimatePresence, motion } from "motion/react";

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

  const blogData = blogsData[postId];

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateTitle({
        id: postId,
        title: e.target.value,
      })
    );
  };

  return (
    <section className="mx-auto w-full max-w-7xl">
      <h1 className="text-4xl font-bold text-slate-900 pb-4">
        Create Blog Post
      </h1>
      <section className="w-full flex gap-5">
        <section className="w-full">
          <form className="flex flex-col gap-3">
            <Input
              type="text"
              placeholder="Post Title"
              className="text-lg md:text-xl h-auto py-3 font-bold"
              onChange={handleTitle}
            />
            <section className="p-3 py-5 shadow-xl rounded-sm border flex flex-col gap-3">
              {blogData?.content.map((block, index, list) => (
                <div key={block.id} className="group">
                  <h1 className="text-xl bg-slate-950 text-white p-4">
                    {block.id}
                  </h1>
                  <AnimatePresence>
                    {index !== list.length - 1 && (
                      <motion.div
                        className="group-hover:block hidden"
                        exit={{ opacity: 0 }}
                      >
                        <AddComponentSection index={index + 1} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              <AddComponentSection />
            </section>
          </form>
        </section>
        {/* <EditorSidebar /> */}
      </section>
      <ComponentDialog />
      <PreviewButton />
    </section>
  );
};

export default CreateBlogPostPage;
