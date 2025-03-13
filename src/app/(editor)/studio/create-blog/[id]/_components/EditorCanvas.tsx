"use client";

import React, { ChangeEvent, KeyboardEvent, memo } from "react";
import { DndContext } from "@dnd-kit/core";
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
import LeftSidebar from "@/app/(editor)/studio/create-blog/[id]/_components/LeftSidebar/LeftSidebar";
import {
  selectBlogContent,
  selectBlogTitle,
} from "@/redux/features/builders/selectors";

const EditorBlogTitle = memo(() => {
  const { id: blogId } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const title = useAppSelector((state) => selectBlogTitle(state, blogId));

  console.log("Re-run title ===========");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateTitle({
        id: blogId,
        title: e.target.value,
      })
    );
  };

  const onKeyChange = (e: KeyboardEvent) => {
    if (e.key === "Enter") e.preventDefault();
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Input
        type="text"
        placeholder="Post Title"
        className="text-lg md:text-xl h-auto py-3 font-bold"
        onChange={onChange}
        value={title}
        onKeyUp={onKeyChange}
      />
    </div>
  );
});

const EditorCanvas = memo(() => {
  const { id: blogId } = useParams<{ id: string }>();

  const content = useAppSelector((state) => selectBlogContent(state, blogId));

  console.log({ content });

  return (
    <DndContext>
      <section className="mx-auto w-full h-full">
        <section className="w-full h-full flex">
          <LeftSidebar />
          <ScrollArea className="h-full w-full flex-1 px-2 py-4">
            <form className="w-full flex flex-col gap-3 mx-auto mb-5">
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
          {/* <EditorSidebar /> */}
        </section>
        <ComponentDialog />
        <EditorPopover />
        <PreviewPopover />
      </section>
    </DndContext>
  );
});

export default EditorCanvas;
