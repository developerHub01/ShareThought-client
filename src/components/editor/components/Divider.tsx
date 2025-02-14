import { cn } from "@/lib/utils";
import { StyleType } from "@/redux/features/builders/blogBuilderSlice";
import { useAppSelector } from "@/redux/hooks";
import handleBorderStyle from "@/utils/editor/handleBorderStyle";
import handleWrapperContentStyleSeparator from "@/utils/editor/handleWrapperContentStyleSeparator";
import React from "react";

export interface DividerProps {
  id: string;
  postId: string;
  className?: string;
  [key: string]: unknown;
}

const Divider = ({ id, postId, className, ...props }: DividerProps) => {
  const {
    metaData: { styles = {} },
  } = useAppSelector((state) => state.blogBuilder.blogs[postId]);

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
      className={cn("flex", className)}
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
