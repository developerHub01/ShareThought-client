"use client";

import { cn } from "@/lib/utils";
import { BlockInterface } from "@/redux/features/builders/blogBuilderSlice";
import { useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import React, { CSSProperties } from "react";

interface HeadingProps extends BlockInterface {
  className?: string;
}

const Heading = ({
  id,
  className,
  text,
  type,
  ...props
}: HeadingProps) => {
  const { id: blogId } = useParams<{ id: string }>();

  const {
    metaData: { styles },
  } = useAppSelector((state) => state.blogBuilder.blogs[blogId]);

  if (!blogId) return null;

  const typographyStyles = styles[id] as CSSProperties;

  switch (type) {
    case "p":
      return (
        <p
          contentEditable
          suppressContentEditableWarning
          className={cn("text-base", className)}
          style={{
            ...typographyStyles,
          }}
        >
          {text}
        </p>
      );
    case "h2":
      return (
        <h2
          contentEditable
          suppressContentEditableWarning
          className={cn("text-3xl font-bold", className)}
          style={{
            ...typographyStyles,
          }}
        >
          {text}
        </h2>
      );
    case "h3":
      return (
        <h3
          contentEditable
          suppressContentEditableWarning
          className={cn("text-2xl font-bold", className)}
          style={{
            ...typographyStyles,
          }}
        >
          {text}
        </h3>
      );
    case "h4":
      return (
        <h4
          contentEditable
          suppressContentEditableWarning
          className={cn("text-xl font-bold", className)}
          style={{
            ...typographyStyles,
          }}
        >
          {text}
        </h4>
      );
    case "h5":
      return (
        <h5
          contentEditable
          suppressContentEditableWarning
          className={cn("text-lg font-bold", className)}
          style={{
            ...typographyStyles,
          }}
        >
          {text}
        </h5>
      );
    case "h6":
      return (
        <h6
          contentEditable
          suppressContentEditableWarning
          className={cn("text-base font-bold", className)}
          style={{
            ...typographyStyles,
          }}
        >
          {text}
        </h6>
      );
    default:
      return (
        <h1
          contentEditable
          suppressContentEditableWarning
          className={cn("text-4xl font-bold", className)}
          style={{
            ...typographyStyles,
          }}
        >
          {text}
        </h1>
      );
  }
};

export default Heading;
