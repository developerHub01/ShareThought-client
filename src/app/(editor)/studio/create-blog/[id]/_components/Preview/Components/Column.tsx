"use client";

import BlockComponent from "@/app/(editor)/studio/create-blog/[id]/_components/BlockComponent";
import BlockComponentWrapper from "@/app/(editor)/studio/create-blog/[id]/_components/BlockComponentWrapper";
import AddComponentSection from "@/app/(editor)/studio/create-blog/[id]/_components/BuilderPopover/AddComponentSection";
import useCombinedResponsiveSettingStyles from "@/hooks/editor/use-combined-responsive-setting-styles";
import { cn } from "@/lib/utils";
import {
  BlogComponentsDataInterface,
  BlogContentType,
  BlogMetaDataInterface,
} from "@/redux/features/builders/blogBuilderSlice";
import handleBorderStyle from "@/utils/editor/handleBorderStyle";
import handleBoxShadow from "@/utils/editor/handleBoxShadow";
import { AnimatePresence, motion } from "motion/react";
import { useParams } from "next/navigation";
import React, { CSSProperties, memo } from "react";
import { useEditorPreview } from "@/app/(editor)/studio/create-blog/[id]/_context/Preview/EditorPreviewProvider";
import BlockDecision from "../BlockDecision";

interface RowProps {
  id: string;
  parentId: string;
  content: BlogContentType;
  components: BlogComponentsDataInterface;
  metaData: BlogMetaDataInterface;
}

const Column = memo((props: RowProps) => {
  const { id, ...restProps } = props;
  const { components, metaData } = restProps;

  const { id: blogId } = useParams<{ id: string }>();
  const { screenType } = useEditorPreview();

  const globalStyles = metaData.globalStyles;
  const styles = metaData.styles[id];
  const mobileStyles = metaData.mobileStyles[id];
  const component = components[id];

  if (!blogId || !component) return null;

  const { children, type } = component;

  let componentStyles = useCombinedResponsiveSettingStyles({
    type,
    screenType,
    styles,
    mobileStyles,
    globalStyles,
  });

  componentStyles = {
    ...componentStyles,
    ...handleBorderStyle(componentStyles),
  };
  componentStyles = {
    ...componentStyles,
    ...handleBoxShadow(componentStyles),
  };

  return (
    <section
      className="w-full h-full flex flex-col"
      style={{
        ...(componentStyles as CSSProperties),
      }}
      data-component-type={type}
      data-component-id={id}
    >
      {Array.isArray(children) && (
        <>
          {children.map((id) => (
            <BlockDecision key={id} {...restProps} id={id} />
          ))}
        </>
      )}
    </section>
  );
});

export default Column;
