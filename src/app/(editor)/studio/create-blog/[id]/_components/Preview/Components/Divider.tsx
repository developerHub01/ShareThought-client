"use client";

import useCombinedResponsiveSettingStyles from "@/hooks/editor/use-combined-responsive-setting-styles";
import {
  BlogComponentsDataInterface,
  BlogContentType,
  BlogMetaDataInterface,
  StyleType,
} from "@/redux/features/builders/blogBuilderSlice";
import handleBorderStyle from "@/utils/editor/handleBorderStyle";
import handleWrapperContentStyleSeparator from "@/utils/editor/handleWrapperContentStyleSeparator";
import { useParams } from "next/navigation";
import React, { memo } from "react";
import { useEditorPreview } from "@/app/(editor)/studio/create-blog/[id]/_context/Preview/EditorPreviewProvider";

interface DividerProps {
  id: string;
  parentId?: string;
  content: BlogContentType;
  components: BlogComponentsDataInterface;
  metaData: BlogMetaDataInterface;
}

const Divider = memo(
  ({ id, parentId, components, metaData, ...props }: DividerProps) => {
    const { id: blogId } = useParams<{ id: string }>();

    const { screenType } = useEditorPreview();
    const styles = metaData.styles[id];
    const mobileStyles = metaData.mobileStyles[id];

    if (!blogId) return null;

    const combinedStyles = useCombinedResponsiveSettingStyles({
      type: "divider",
      screenType,
      styles,
      mobileStyles,
    });

    let { contentStyles, wrapperStyles } =
      handleWrapperContentStyleSeparator(combinedStyles);

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
        data-component-type={"divider"}
        data-component-id={id}
      >
        <div
          style={{
            ...contentStyles,
          }}
        ></div>
      </div>
    );
  }
);

export default Divider;
