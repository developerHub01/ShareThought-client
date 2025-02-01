import useHandleBorderStyle from "@/hooks/editor/use-handle-border-style";
import useWrapperContentStyleSeparator from "@/hooks/editor/use-wrapper-content-style-separator";
import { cn } from "@/lib/utils";
import { StyleType } from "@/redux/features/builders/blogBuilderSlice";
import { useAppSelector } from "@/redux/hooks";
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
    useWrapperContentStyleSeparator(componentStyles);

  contentStyles = {
    ...contentStyles,
    ...useHandleBorderStyle(contentStyles as StyleType),
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
