"use client";

import React, { ChangeEvent, KeyboardEvent } from "react";
import AddComponentSection from "@/app/(editor)/studio/create-blog/[id]/_components/BuilderPopover/AddComponentSection";
import ComponentDialog from "@/app/(editor)/studio/create-blog/[id]/_components/BuilderPopover/ComponentDialog";
import EditorSidebar from "@/app/(editor)/studio/create-blog/[id]/_components/EditorSidebar";
import { AnimatePresence, motion } from "motion/react";
import BlockComponent from "@/app/(editor)/studio/create-blog/[id]/_components/BlockComponent";
import { Input } from "@/components/ui/input";
import { updateTitle } from "@/redux/features/builders/blogBuilderSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import EditorPopover from "@/app/(editor)/studio/create-blog/[id]/_components/ImageEditor/EditorPopover";
import PreviewPopover from "@/app/(editor)/studio/create-blog/[id]/_components/Preview/PreviewPopover";

const EditorCanvas = () => {
  const { id: postId } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const blogsData = useAppSelector((state) => state?.blogBuilder?.blogs);
  const blogData = blogsData[postId];

  if (!blogData) return null;

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateTitle({
        id: postId,
        title: e.target.value,
      })
    );
  };

  const handleKeyEnter = (e: KeyboardEvent) => {
    if (e.key === "Enter") e.preventDefault();
  };

  return (
    <section className="mx-auto w-full h-full">
      <section className="w-full h-full flex">
        <ScrollArea className="h-full w-full flex-1 px-2 py-4">
          <form className="w-full flex flex-col gap-3 mx-auto mb-5">
            <div className="w-full max-w-3xl mx-auto">
              <Input
                type="text"
                placeholder="Post Title"
                className="text-lg md:text-xl h-auto py-3 font-bold"
                onChange={handleTitle}
                value={blogData.title}
                onKeyUp={handleKeyEnter}
              />
            </div>
            <section className="w-full py-5 px-1 flex flex-col">
              {Boolean(blogData?.content.length) && (
                <AddComponentSection index={0} />
              )}
              {blogData?.content.map((id, index, list) => (
                <div key={id} className="group">
                  <BlockComponent
                    {...blogData.components[id]}
                    postId={postId}
                  />
                  <AnimatePresence>
                    {index !== list.length - 1 && (
                      <motion.div
                        className="group-hover:opacity-100 group-hover:scale-y-100 opacity-0 scale-y-0 -translate-y-1/2 mt-1 mx-auto"
                        exit={{ opacity: 0 }}
                      >
                        <AddComponentSection index={index + 1} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              <AddComponentSection index={blogData?.content.length} />
            </section>
          </form>
        </ScrollArea>
        <EditorSidebar />
      </section>
      <ComponentDialog />
      <EditorPopover />
      <PreviewPopover />
    </section>
  );
};

export default EditorCanvas;
