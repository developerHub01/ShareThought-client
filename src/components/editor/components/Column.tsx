"use client";

import BlockComponent from "@/app/(editor)/studio/create-blog/[id]/_components/BlockComponent";
import AddComponentSection from "@/app/(editor)/studio/create-blog/[id]/_components/BuilderPopover/AddComponentSection";
import { BlockInterface } from "@/redux/features/builders/blogBuilderSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { AnimatePresence, motion } from "motion/react";
import { useParams } from "next/navigation";
import React from "react";

interface RowProps extends BlockInterface {
  className?: string;
  parentId: string;
}

const Column = ({ id, gridSize, children, ...props }: RowProps) => {
  const dispatch = useAppDispatch();
  const { id: postId } = useParams<{ id: string }>();

  if (!postId) return;

  const { components } =
    useAppSelector((state) => state?.blogBuilder?.blogs[postId]) || {};

  return (
    <section className="w-full flex flex-col">
      {Array.isArray(children) && (
        <>
          {Boolean(children.length) && <AddComponentSection index={0} />}
          {children.map((id, index, list) => (
            <div key={id} className="group">
              <BlockComponent {...components[id]} postId={postId} />
              <AnimatePresence>
                {index !== list.length - 1 && (
                  <motion.div
                    className="group-hover:opacity-100 group-hover:scale-y-100 opacity-0 scale-y-0 -translate-y-1/2 mt-1 mx-auto"
                    exit={{ opacity: 0 }}
                  >
                    <AddComponentSection index={index + 1} parentId={id} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          <AddComponentSection index={children.length} parentId={id} />
        </>
      )}
    </section>
  );
};

export default Column;
