"use client";

import React, { useMemo } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface ContentWrapperProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

const ContentWrapper = ({ className, children, id }: ContentWrapperProps) => {
  const searchParams = useSearchParams();

  const isContentOpen = useMemo(
    () =>
      searchParams.get("sidebar")?.toLowerCase().trim() ===
      id.toLowerCase().trim(),
    [searchParams, id]
  );

  return (
    <div className="h-full relative z-20">
      <AnimatePresence>
        {isContentOpen && (
          <motion.div
            className={cn(
              "absolute top-0 left-0 w-52 h-full rounded-r-md bg-primary-foreground shadow-xl overflow-hidden border",
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
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContentWrapper;
