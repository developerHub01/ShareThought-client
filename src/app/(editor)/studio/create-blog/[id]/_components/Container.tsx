"use client";

import { cn } from "@/lib/utils";
import { useEditor } from "@/app/(editor)/studio/create-blog/[id]/_context/EditorProvider";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  [key: string]: unknown;
}

const Container = ({ children, className }: ContainerProps) => {
  const { responsiveFrameMode } = useEditor();

  return (
    <section
      aria-label="container"
      className={cn("w-full max-w-3xl mx-auto", className, {
        "max-w-3xl": responsiveFrameMode === "desktop",
        "max-w-md": responsiveFrameMode === "mobile",
      })}
    >
      {children}
    </section>
  );
};

export default Container;
