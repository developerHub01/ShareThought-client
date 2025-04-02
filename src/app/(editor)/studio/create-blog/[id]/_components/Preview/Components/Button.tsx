"use client";

import {
  BlogComponentsDataInterface,
  BlogContentType,
  BlogMetaDataInterface,
  StyleType,
} from "@/redux/features/builders/blogBuilderSlice";
import { useParams } from "next/navigation";
import React, { memo } from "react";
import handleWrapperContentStyleSeparator from "@/utils/editor/handleWrapperContentStyleSeparator";
import handleBorderStyle from "@/utils/editor/handleBorderStyle";
import Link from "next/link";
import { cn } from "@/lib/utils";
import handlePaddingExtractor from "@/utils/editor/handlePaddingExtractor";
import handleSpecificStyleRemover from "@/utils/editor/handleSpecificStyleRemover";
import handleBoxShadowExtractor from "@/utils/editor/handleBoxShadowExtractor";
import useCombinedResponsiveSettingStyles from "@/hooks/editor/use-combined-responsive-setting-styles";
import { useEditorPreview } from "@/app/(editor)/studio/create-blog/[id]/_context/Preview/EditorPreviewProvider";

interface ButtonProps {
  id: string;
  parentId?: string;
  content: BlogContentType;
  components: BlogComponentsDataInterface;
  metaData: BlogMetaDataInterface;
}

const Button = memo(
  ({ id, parentId, components, metaData, ...props }: ButtonProps) => {
    const { id: blogId } = useParams<{ id: string }>();

    const { screenType } = useEditorPreview();
    const globalStyles = metaData.globalStyles;
    const styles = metaData.styles[id];
    const mobileStyles = metaData.mobileStyles[id];
    const component = components[id];

    if (!blogId || !component) return null;

    const { text, redirect, type } = component;

    const combinedStyles = useCombinedResponsiveSettingStyles({
      type,
      screenType,
      styles,
      mobileStyles,
      globalStyles,
    });

    let { contentStyles, wrapperStyles } =
      handleWrapperContentStyleSeparator(combinedStyles);

    const filteredBorder = handleBorderStyle(combinedStyles);

    contentStyles = { ...contentStyles, ...filteredBorder };

    contentStyles = {
      ...contentStyles,
      ...handlePaddingExtractor(wrapperStyles as StyleType),
    };

    contentStyles = {
      ...contentStyles,
      ...handleBoxShadowExtractor(wrapperStyles as StyleType),
    };

    wrapperStyles = {
      ...handleSpecificStyleRemover(wrapperStyles as StyleType, "padding"),
    };
    wrapperStyles = {
      ...handleSpecificStyleRemover(wrapperStyles as StyleType, "boxShadow"),
    };

    if (typeof contentStyles.width === "number")
      contentStyles.width = `${contentStyles.width}%`;

    const Comp = () => (
      <button
        type="button"
        contentEditable
        suppressContentEditableWarning
        className={cn(
          "text-base px-4 py-2 bg-primary text-primary-foreground cursor-pointer"
        )}
        style={{
          ...contentStyles,
        }}
      >
        {text}
      </button>
    );

    return (
      <div
        className="flex"
        style={{
          ...wrapperStyles,
        }}
        data-component-type={type}
        data-component-id={id}
      >
        {/* id === activeBlock so that user can edit text without that redirect issue */}
        {redirect ? (
          <Link href={redirect} target="_blank">
            <Comp />
          </Link>
        ) : (
          <Comp />
        )}
      </div>
    );
  }
);

export default Button;
