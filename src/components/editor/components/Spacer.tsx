"use client";

import { cn } from "@/lib/utils";
import { useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import React, { CSSProperties } from "react";

interface SpacerProps {
  id: string;
  className?: string;
  [key: string]: unknown;
}

const Spacer = ({ id, className, ...props }: SpacerProps) => {
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return null;

  const {
    metaData: { styles = {} },
  } = useAppSelector((state) => state.blogBuilder.blogs[blogId]);

  const componentStyles = (styles[id] as CSSProperties) || {};

  return (
    <div
      className={cn("", className)}
      style={{
        ...componentStyles,
      }}
    ></div>
  );
};

export default Spacer;
