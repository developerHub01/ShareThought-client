"use client";

import React from "react";
import { useEditorPreview } from "@/app/(editor)/studio/create-blog/[id]/_context/Preview/EditorPreviewProvider";
import { cn } from "@/lib/utils";

interface PreviewHeadingProps {
  title: string;
}

const PreviewHeading = ({ title }: PreviewHeadingProps) => {
  const { screenType } = useEditorPreview();

  return (
    <h1
      className={cn("font-bold text-primary pb-4", {
        "text-3xl": screenType === "mobile",
        "text-4xl": screenType === "desktop",
      })}
    >
      {title || "Dummy Blog Title"}
    </h1>
  );
};

export default PreviewHeading;
