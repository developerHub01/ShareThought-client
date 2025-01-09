"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { Button } from "@/components/ui/button";
import { RefreshCw as RefreshIcon } from "lucide-react";

const PreviewBlogPostPage = () => {
  const [refreshState, setRefreshState] = useState(false);
  const { id: postId } = useParams<{ id: string }>();
  // const blogsData = useAppSelector((state) => state.blogBuilder.blogs);

  const handleRefreshState = () => setRefreshState((prev) => !prev);

  // if (!blogsData) return null;

  // const blogData = blogsData[postId];
  // console.log(blogData);

  return (
    <section className="mx-auto w-full max-w-7xl pb-5">
      <h1 className="text-4xl font-bold text-slate-900 pb-4">
        {/* {blogData.title} */}
      </h1>
      <section className="w-full flex gap-5">
        <section className="w-full">
          <form className="flex flex-col gap-3">
            <section className="p-3 py-5 shadow-xl rounded-sm border flex flex-col">
              {/* {blogData?.content.map((block, index, list) => (
                <div key={block.id} className="group">
                  <BlockComponent {...block} />
                  <AnimatePresence>
                    {index !== list.length - 1 && (
                      <motion.div
                        className="group-hover:opacity-100 group-hover:scale-y-100 opacity-0 scale-y-0 -translate-y-1/2"
                        {...({} as MotionDivProps)}
                        exit={{ opacity: 0 }}
                      >
                        <AddComponentSection index={index + 1} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))} */}
              {/* <AddComponentSection /> */}
            </section>
          </form>
        </section>
        {/* <EditorSidebar /> */}
      </section>
      <Button className="fixed right-1 bottom-1" onClick={handleRefreshState}>
        <RefreshIcon size={20} />
        Refresh
      </Button>
    </section>
  );
};

export default PreviewBlogPostPage;
