"use client";

import { cn } from "@/lib/utils";
import {
  BlockInterface,
  updateComponentText,
} from "@/redux/features/builders/blogBuilderSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import React, { CSSProperties, FocusEvent } from "react";

interface HeadingProps extends BlockInterface {
  className?: string;
}

const Heading = ({ id, className, text, type, ...props }: HeadingProps) => {
  const { id: blogId } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const {
    metaData: { styles },
  } = useAppSelector((state) => state.blogBuilder.blogs[blogId]);

  if (!blogId) return null;

  const typographyStyles = styles[id] as CSSProperties;

  const handleBlur = (
    e: FocusEvent<HTMLHeadElement | HTMLParagraphElement>
  ) => {
    dispatch(
      updateComponentText({
        blogId,
        id,
        text: e.target.innerText ?? "",
      })
    );
  };

  switch (type) {
    case "p":
      return (
        <p
          contentEditable
          suppressContentEditableWarning
          onBlur={handleBlur}
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
          onBlur={handleBlur}
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
          onBlur={handleBlur}
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
          onBlur={handleBlur}
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
          onBlur={handleBlur}
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
          onBlur={handleBlur}
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
          onBlur={handleBlur}
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
