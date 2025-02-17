"use client";

import { cn } from "@/lib/utils";
import {
  BlockInterface,
  updateComponentText,
} from "@/redux/features/builders/blogBuilderSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import React, { CSSProperties, FocusEvent } from "react";
import { typographyList } from "@/components/editor/constant";

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

  const { tag: Tag, className: defaultClassName } =
    typographyList[type] || typographyList.h1;

  return (
    <Tag
      contentEditable
      suppressContentEditableWarning
      onBlur={handleBlur}
      className={cn(defaultClassName, className)}
      style={{
        ...typographyStyles,
      }}
    >
      {text}
    </Tag>
  );
};

export default Heading;
