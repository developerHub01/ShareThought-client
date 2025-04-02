"use client";

import useCombinedResponsiveSettingStyles from "@/hooks/editor/use-combined-responsive-setting-styles";
import { cn } from "@/lib/utils";
import {
  selectBlogMobileStylesById,
  selectBlogScreenType,
  selectBlogStylesById,
} from "@/redux/features/builders/selectors";
import { useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import React, { CSSProperties, memo } from "react";

interface SpacerProps {
  id: string;
  parentId?: string;
  className?: string;
  [key: string]: unknown;
}

const Spacer = memo(({ id, parentId, className, ...props }: SpacerProps) => {
  const { id: blogId } = useParams<{ id: string }>();

  const screenType = useAppSelector((state) =>
    selectBlogScreenType(state, blogId)
  );
  const styles = useAppSelector((state) =>
    selectBlogStylesById(state, blogId, id)
  );
  const mobileStyles = useAppSelector((state) =>
    selectBlogMobileStylesById(state, blogId, id)
  );

  if (!blogId) return null;

  const combinedStyles = useCombinedResponsiveSettingStyles({
    type: "spacer",
    screenType,
    styles,
    mobileStyles,
  });

  return (
    <div
      className={cn("", className)}
      style={{
        ...(combinedStyles as CSSProperties),
      }}
      data-component-type={"spacer"}
      data-component-id={id}
    ></div>
  );
});

export default Spacer;
