"use client";

import { StyleType } from "@/redux/features/builders/blogBuilderSlice";
import { useAppSelector } from "@/redux/hooks";
import handleBorderStyle from "@/utils/editor/handleBorderStyle";
import handleWrapperContentStyleSeparator from "@/utils/editor/handleWrapperContentStyleSeparator";
import { useParams } from "next/navigation";
import React from "react";

interface DividerProps {
  id: string;
}

const Divider = ({ id, ...props }: DividerProps) => {
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return null;

  const {
    metaData: { styles = {} },
  } = useAppSelector((state) => state.blogBuilder.blogs[blogId]);

  const componentStyles = styles[id] || {};

  let { contentStyles, wrapperStyles } =
    handleWrapperContentStyleSeparator(componentStyles);

  contentStyles = {
    ...contentStyles,
    ...handleBorderStyle(contentStyles as StyleType),
  };

  if (contentStyles.width) contentStyles.width = `${contentStyles.width}%`;

  return (
    <div
      className={"flex"}
      style={{
        ...(wrapperStyles as Record<string, string | number>),
      }}
    >
      <div
        style={{
          ...contentStyles,
        }}
      ></div>
    </div>
  );
};

export default Divider;
