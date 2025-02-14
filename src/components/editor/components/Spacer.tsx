import { cn } from "@/lib/utils";
import { useAppSelector } from "@/redux/hooks";
import React, { CSSProperties } from "react";

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

  const componentStyles = (styles[id] as CSSProperties) || {};

  return (
    <div
      className={cn("", className)}
      style={{
        ...componentStyles,
      }}
    ></div>
  );
};

export default Spacer;
