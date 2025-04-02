"use client";

import React, { useMemo, memo } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ContentWrapperProps {
  id: string;
  children: React.ReactNode;
  label?: string;
  className?: string;
}

const ContentWrapper = memo(
  ({ className, children, id, label }: ContentWrapperProps) => {
    const searchParams = useSearchParams();

    const isContentOpen = useMemo(
      () =>
        searchParams.get("sidebar")?.toLowerCase().trim() ===
        id.toLowerCase().trim(),
      [searchParams, id]
    );

    return (
      <div className="h-full w-auto relative z-20 select-none flex flex-col">
        <AnimatePresence>
          {isContentOpen && (
            <motion.div
              className={cn(
                "absolute top-0 left-0 w-64 h-full bg-primary-foreground shadow-xl overflow-hidden border",
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
              <div className="p-2 text-base font-bold capitalize border-b">
                <h4>{label ?? id}</h4>
              </div>
              <ScrollArea className="w-full h-full px-2 text-sm">
                {children}
              </ScrollArea>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

export default ContentWrapper;
