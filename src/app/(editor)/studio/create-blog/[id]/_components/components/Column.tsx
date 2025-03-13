"use client";

import BlockComponent from "@/app/(editor)/studio/create-blog/[id]/_components/BlockComponent";
import BlockComponentWrapper from "@/app/(editor)/studio/create-blog/[id]/_components/BlockComponentWrapper";
import AddComponentSection from "@/app/(editor)/studio/create-blog/[id]/_components/BuilderPopover/AddComponentSection";
import { cn } from "@/lib/utils";
import { StyleType } from "@/redux/features/builders/blogBuilderSlice";
import {
  selectBlogComponentById,
  selectBlogStylesById,
} from "@/redux/features/builders/selectors";
import { useAppSelector } from "@/redux/hooks";
import handleBorderStyle from "@/utils/editor/handleBorderStyle";
import handleBoxShadow from "@/utils/editor/handleBoxShadow";
import { AnimatePresence, motion } from "motion/react";
import { useParams } from "next/navigation";
import React, { CSSProperties } from "react";

interface RowProps {
  id: string;
  parentId: string;
}

const Column = ({ id, ...props }: RowProps) => {
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return;

  const { children, type } = useAppSelector((state) =>
    selectBlogComponentById(state, blogId, id)
  );
  const styles = useAppSelector((state) =>
    selectBlogStylesById(state, blogId, id)
  );

  let componentStyles: StyleType = styles ?? {};

  componentStyles = {
    ...componentStyles,
    ...handleBorderStyle(componentStyles),
  };
  componentStyles = {
    ...componentStyles,
    ...handleBoxShadow(componentStyles),
  };

  return (
    <BlockComponentWrapper id={id}>
      <section
        className={cn("w-full h-full flex flex-col", {
          "py-10 bg-primary/10": Array.isArray(children) && !children.length,
        })}
        style={{
          ...(componentStyles as CSSProperties),
        }}
        data-component-type={type}
        data-component-id={id}
      >
        {Array.isArray(children) && (
          <>
            {Boolean(children.length) && <AddComponentSection index={0} />}
            {children.map((currentId, index, list) => (
              <React.Fragment key={currentId}>
                <BlockComponent id={currentId} parentId={id} />
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
              </React.Fragment>
            ))}
            <AddComponentSection index={children.length} parentId={id} />
          </>
        )}
      </section>
    </BlockComponentWrapper>
  );
};

export default Column;
