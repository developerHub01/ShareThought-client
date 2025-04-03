"use client";

import {
  BlogComponentsDataInterface,
  BlogContentType,
  BlogMetaDataInterface,
} from "@/redux/features/builders/blogBuilderSlice";
import { useParams } from "next/navigation";
import React, { memo } from "react";
import { TYPOGRAPHY_LIST } from "@/constant";
import useCombinedResponsiveSettingStyles from "@/hooks/editor/use-combined-responsive-setting-styles";
import { useEditorPreview } from "@/app/(editor)/studio/create-blog/[id]/_context/Preview/EditorPreviewProvider";

interface HeadingProps {
  id: string;
  parentId?: string;
  content: BlogContentType;
  components: BlogComponentsDataInterface;
  metaData: BlogMetaDataInterface;
}

const Heading = memo(
  ({ id, parentId, components, metaData, ...props }: HeadingProps) => {
    const { id: blogId } = useParams<{ id: string }>();
    const { screenType } = useEditorPreview();

    const globalStyles = metaData.globalStyles;
    const styles = metaData.styles[id];
    const mobileStyles = metaData.mobileStyles[id];
    const component = components[id];

    if (!blogId || !component) return null;

    const { type, text } = component;

    const combinedStyles = useCombinedResponsiveSettingStyles({
      type,
      screenType,
      styles,
      mobileStyles,
      globalStyles,
    });

    const { tag: Tag, className: defaultClassName } =
      TYPOGRAPHY_LIST[type] || TYPOGRAPHY_LIST.h1;

    return (
      <Tag
        data-component-type={type}
        data-component-id={id}
        className={defaultClassName}
        style={{
          ...combinedStyles,
        }}
      >
        {text}
      </Tag>
    );
  }
);

export default Heading;
