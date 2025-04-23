"use client";

import React, { memo } from "react";
import { DndContext } from "@dnd-kit/core";
import AddComponentSection from "@/app/(editor)/studio/create-blog/[id]/_components/BuilderPopover/AddComponentSection";
import ComponentDialog from "@/app/(editor)/studio/create-blog/[id]/_components/BuilderPopover/ComponentDialog";
import EditorSidebar from "@/app/(editor)/studio/create-blog/[id]/_components/Sidebar/EditorSidebar";
import { AnimatePresence, motion } from "motion/react";
import BlockComponent from "@/app/(editor)/studio/create-blog/[id]/_components/BlockComponent";
import { useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import EditorPopover from "@/app/(editor)/studio/create-blog/[id]/_components/ImageEditor/EditorPopover";
import EditorPreview from "@/app/(editor)/studio/create-blog/[id]/_components/Preview/EditorPreview";
import LeftSidebarWrapper from "@/app/(editor)/studio/create-blog/[id]/_components/LeftSidebar/LeftSidebarWrapper";
import { selectBlogContent } from "@/redux/features/builders/selectors";
import EditorBlogTitle from "@/app/(editor)/studio/create-blog/[id]/_components/EditorBlogTitle";
import BlogBanner from "@/app/(editor)/studio/create-blog/[id]/_components/Banner/BlogBanner";

const EditorCanvas = memo(() => {
  const { id: blogId } = useParams<{ id: string }>();

  const content = useAppSelector((state) => selectBlogContent(state, blogId));

  return (
    <DndContext>
      <section className="mx-auto w-full h-full">
        <section className="w-full h-full flex">
          <LeftSidebarWrapper />
          <ScrollArea className="h-full w-full flex-1 px-2 py-4">
            <form className="w-full flex flex-col gap-3 mx-auto mb-5">
              <BlogBanner />
              <EditorBlogTitle />
              <section className="w-full h-full py-5 px-1 flex flex-col">
                <AnimatePresence>
                  {Boolean(content.length) && (
                    <AddComponentSection lavel={0} index={0} />
                  )}
                </AnimatePresence>

                {content.map((id, index, list) => (
                  <div key={id} className="group w-full h-full">
                    <BlockComponent lavel={1} id={id} />
                    <AnimatePresence>
                      {index !== list.length - 1 && (
                        <motion.div
                          className="group-hover:opacity-100 group-hover:scale-y-100 opacity-0 scale-y-0 -translate-y-1/2 mt-1 mx-auto"
                          exit={{ opacity: 0 }}
                        >
                          <AddComponentSection lavel={0} index={index + 1} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                <AddComponentSection lavel={0} index={content.length} />
              </section>
            </form>
          </ScrollArea>
          <EditorSidebar />
        </section>
        <ComponentDialog />
        <EditorPopover />
        <EditorPreview />
      </section>
    </DndContext>
  );
});

export default EditorCanvas;
