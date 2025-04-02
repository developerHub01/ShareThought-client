"use client";

import useCombinedResponsiveSettingStyles from "@/hooks/editor/use-combined-responsive-setting-styles";
import { cn } from "@/lib/utils";
import {
  BlogComponentsDataInterface,
  BlogContentType,
  BlogMetaDataInterface,
} from "@/redux/features/builders/blogBuilderSlice";
import { useParams } from "next/navigation";
import React, { CSSProperties, memo } from "react";
import { useEditorPreview } from "@/app/(editor)/studio/create-blog/[id]/_context/Preview/EditorPreviewProvider";

interface SpacerProps {
  id: string;
  parentId?: string;
  className?: string;
  content: BlogContentType;
  components: BlogComponentsDataInterface;
  metaData: BlogMetaDataInterface;
  [key: string]: unknown;
}

const Spacer = memo(
  ({
    id,
    parentId,
    className,
    components,
    metaData,
    ...props
  }: SpacerProps) => {
    const { id: blogId } = useParams<{ id: string }>();

    const { screenType } = useEditorPreview();
    const styles = metaData.styles[id];
    const mobileStyles = metaData.mobileStyles[id];

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
  }
);

export default Spacer;
