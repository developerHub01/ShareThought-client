"use client";

import React, { useMemo, memo } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import ContentInnerWrapper from "@/app/(editor)/studio/create-blog/[id]/_components/LeftSidebar/ContentInnerWrapper";
import { useLeftSidebar } from "@/app/(editor)/studio/create-blog/[id]/_context/LeftSidebar/LeftSidebarProvider";

interface ContentWrapperProps {
  id: string;
  children: React.ReactNode;
  label?: string;
  className?: string;
}

const ContentWrapper = memo(
  ({ className, children, id, label }: ContentWrapperProps) => {
    const { sidebarActiveTab } = useLeftSidebar();

    const isContentOpen = useMemo(
      () => sidebarActiveTab === id,
      [sidebarActiveTab, id]
    );

    return (
      <div
        className="h-full w-auto relative z-20 select-none flex flex-col"
        tabIndex={0}
      >
        <AnimatePresence>
          {isContentOpen && (
            <motion.div
              className={cn(
                "absolute top-0 left-0 w-64 h-full bg-primary-foreground shadow-xl overflow-visible border flex flex-col",
                className
              )}
              initial={{
                opacity: 0,
                x: "-50%",
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x: "-50%",
              }}
              transition={{
                duration: 0.2,
                ease: "anticipate",
              }}
            >
              <ContentInnerWrapper id={id} label={label}>
                {children}
              </ContentInnerWrapper>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

export default ContentWrapper;
