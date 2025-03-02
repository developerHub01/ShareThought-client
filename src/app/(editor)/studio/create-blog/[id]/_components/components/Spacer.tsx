"use client";

import { cn } from "@/lib/utils";
import { useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import React, { CSSProperties } from "react";

interface SpacerProps {
  id: string;
  parentId?: string;
  className?: string;
  [key: string]: unknown;
}

const Spacer = ({ id, parentId, className, ...props }: SpacerProps) => {
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return null;

  const {
    components,
    metaData: { styles = {} },
  } = useAppSelector((state) => state.blogBuilder.blogs[blogId]);

  if (!components[id]) return null;

  const { type } = components[id];

  const componentStyles = (styles[id] as CSSProperties) || {};

  return (
    <div
      className={cn("", className)}
      style={{
        ...componentStyles,
      }}
      data-component-type={type}
      data-component-id={id}
    ></div>
  );
};

export default Spacer;
