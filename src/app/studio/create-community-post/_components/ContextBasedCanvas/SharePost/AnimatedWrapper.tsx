"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import React, { ReactNode } from "react";

interface AnimatedWrapperProps {
  children: ReactNode;
  direction?: "left" | "right";
  keyName: string;
  show: boolean;
  className?: string;
}

const AnimatedWrapper = ({
  children,
  direction = "left",
  keyName,
  show,
  className,
}: AnimatedWrapperProps) => {
  const offset = direction === "left" ? -10 : 10;

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          key={keyName}
          initial={{ opacity: 0, x: offset }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: offset }}
          transition={{ duration: 0.2 }}
          className={cn("", className)}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimatedWrapper;
