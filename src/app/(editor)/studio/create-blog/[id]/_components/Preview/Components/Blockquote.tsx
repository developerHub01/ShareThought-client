"use client";

import React, { CSSProperties } from "react";

import {
  BlockquoteInterface,
  BlogComponentsDataInterface,
  BlogContentType,
  BlogMetaDataInterface,
} from "@/redux/features/builders/blogBuilderSlice";
import BlockquoteComponent from "@/components/ui/blockquote";
import useCombinedResponsiveSettingStyles from "@/hooks/editor/use-combined-responsive-setting-styles";
import { useEditorPreview } from "@/app/(editor)/studio/create-blog/[id]/_context/Preview/EditorPreviewProvider";

interface BlockquoteProps {
  id: string;
  content: BlogContentType;
  components: BlogComponentsDataInterface;
  metaData: BlogMetaDataInterface;
}

const Blockquote = ({
  id,
  components,
  metaData,
  ...props
}: BlockquoteProps) => {
  const component = components?.[id];

  const styles = metaData.styles?.[id];
  const mobileStyles = metaData.mobileStyles?.[id];
  const { screenType } = useEditorPreview();

  if (!component || component.type !== "blockquote" || !component?.children)
    return null;

  const combinedStyles = useCombinedResponsiveSettingStyles({
    type: "blockquote",
    screenType,
    styles,
    mobileStyles,
  }) as CSSProperties;

  const blockquoteData = component.children as BlockquoteInterface;

  return <BlockquoteComponent {...blockquoteData} styles={combinedStyles} />;
};

export default Blockquote;
