"use client";

import { cn } from "@/lib/utils";
import {
  selectBlogComponentById,
  selectBlogStylesById,
} from "@/redux/features/builders/selectors";
import { useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import React, { CSSProperties } from "react";

interface SpacerProps {
  id: string;
  parentId?: string;
  className?: string;
  [key: string]: unknown;
}

const Spacer = ({ id, parentId, className, ...props }: SpacerProps) => {
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return null;

  const styles = useAppSelector((state) =>
    selectBlogStylesById(state, blogId, id)
  ) as CSSProperties;

  const component = useAppSelector((state) =>
    selectBlogComponentById(state, blogId, id)
  );

  if (!component) return null;

  const { type } = component;

  return (
    <div
      className={cn("", className)}
      style={{
        ...styles,
      }}
      data-component-type={type}
      data-component-id={id}
    ></div>
  );
};

export default Spacer;
