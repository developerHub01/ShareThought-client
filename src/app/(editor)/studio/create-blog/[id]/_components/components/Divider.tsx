"use client";

import { StyleType } from "@/redux/features/builders/blogBuilderSlice";
import {
  selectBlogComponentById,
  selectBlogStylesById,
} from "@/redux/features/builders/selectors";
import { useAppSelector } from "@/redux/hooks";
import handleBorderStyle from "@/utils/editor/handleBorderStyle";
import handleWrapperContentStyleSeparator from "@/utils/editor/handleWrapperContentStyleSeparator";
import { useParams } from "next/navigation";
import React, { memo } from "react";

interface DividerProps {
  id: string;
  parentId?: string;
}

const Divider = memo(({ id, parentId, ...props }: DividerProps) => {
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return null;

  const styles = useAppSelector((state) =>
    selectBlogStylesById(state, blogId, id)
  );

  const component = useAppSelector((state) =>
    selectBlogComponentById(state, blogId, id)
  );

  if (component) return null;

  const { type } = component;

  let { contentStyles, wrapperStyles } =
    handleWrapperContentStyleSeparator(styles);

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
});

export default Divider;
