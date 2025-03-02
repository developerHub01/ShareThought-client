"use client";

import { StyleType } from "@/redux/features/builders/blogBuilderSlice";
import { useAppSelector } from "@/redux/hooks";
import handleBorderStyle from "@/utils/editor/handleBorderStyle";
import handleWrapperContentStyleSeparator from "@/utils/editor/handleWrapperContentStyleSeparator";
import { useParams } from "next/navigation";
import React from "react";

interface DividerProps {
  id: string;
  parentId?: string;
}

const Divider = ({ id, parentId, ...props }: DividerProps) => {
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return null;

  const {
    components,
    metaData: { styles = {} },
  } = useAppSelector((state) => state.blogBuilder.blogs[blogId]);

  if (!components[id]) return null;

  const { type } = components[id];

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
      data-component-type={type}
      data-component-id={id}
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
