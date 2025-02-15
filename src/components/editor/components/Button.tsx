"use client";

import {
  BlockInterface,
  StyleType,
} from "@/redux/features/builders/blogBuilderSlice";
import { useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import React from "react";
import handleWrapperContentStyleSeparator from "@/utils/editor/handleWrapperContentStyleSeparator";
import handleBorderStyle from "@/utils/editor/handleBorderStyle";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps extends BlockInterface {
  className?: string;
  [key: string]: unknown;
}

const Button = ({ id, text, redirect, ...props }: ButtonProps) => {
  const { id: blogId } = useParams<{ id: string }>();

  const {
    metaData: { styles },
    activeBlock,
  } = useAppSelector((state) => state.blogBuilder.blogs[blogId]);

  if (!blogId) return null;

  const buttonStyles: StyleType = styles[id];

  let { contentStyles, wrapperStyles } =
    handleWrapperContentStyleSeparator(buttonStyles);

  const filteredBorder = handleBorderStyle(buttonStyles);

  contentStyles = { ...contentStyles, ...filteredBorder };

  const Comp = () => (
    <button
      type="button"
      contentEditable
      suppressContentEditableWarning
      className={cn("text-base px-4 py-2 bg-primary text-primary-foreground", {
        "cursor-auto": id === activeBlock,
        "cursor-pointer": id !== activeBlock,
      })}
      style={{
        ...contentStyles,
      }}
    >
      {text}
    </button>
  );

  return (
    <div
      style={{
        ...wrapperStyles,
      }}
    >
      {redirect ? (
        <Link href={redirect}>
          <Comp />
        </Link>
      ) : (
        <Comp />
      )}
    </div>
  );
};

export default Button;
