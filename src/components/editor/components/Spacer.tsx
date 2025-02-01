import { cn } from "@/lib/utils";
import { useAppSelector } from "@/redux/hooks";
import React from "react";

export interface SpacerProps {
  id: string;
  postId: string;
  className?: string;
  [key: string]: unknown;
}

const Spacer = ({ id, postId, className, ...props }: SpacerProps) => {
  const {
    metaData: { styles = {} },
  } = useAppSelector((state) => state.blogBuilder.blogs[postId]);

  const componentStyles = styles[id] || {};

  return (
    <div
      className={cn("", className)}
      style={{
        ...(componentStyles as Record<string, string | number>),
      }}
    ></div>
  );
};

export default Spacer;
