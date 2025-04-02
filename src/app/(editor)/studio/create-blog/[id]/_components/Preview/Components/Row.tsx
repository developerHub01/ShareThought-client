"use client";

import React, { CSSProperties, memo } from "react";
import { cn } from "@/lib/utils";
import handleBorderStyle from "@/utils/editor/handleBorderStyle";
import handleBoxShadow from "@/utils/editor/handleBoxShadow";
import useCombinedResponsiveSettingStyles from "@/hooks/editor/use-combined-responsive-setting-styles";
import Column from "@/app/(editor)/studio/create-blog/[id]/_components/Preview/Components/Column";
import {
  BlogComponentsDataInterface,
  BlogContentType,
  BlogMetaDataInterface,
} from "@/redux/features/builders/blogBuilderSlice";
import { useEditorPreview } from "@/app/(editor)/studio/create-blog/[id]/_context/Preview/EditorPreviewProvider";

interface RowProps {
  id: string;
  parentId?: string;
  content: BlogContentType;
  components: BlogComponentsDataInterface;
  metaData: BlogMetaDataInterface;
}

const getColSpan = (column: number) => {
  const colSpanMap: Record<number, string> = {
    1: "md:col-span-1",
    2: "md:col-span-2",
    3: "md:col-span-3",
    4: "md:col-span-4",
    6: "md:col-span-6",
    8: "md:col-span-8",
    12: "md:col-span-12",
  };

  return colSpanMap[column] || "md:col-span-12"; // Fallback to col-span-12
};

const Row = memo((props: RowProps) => {
  const { id, ...restProps } = props;
  const { components, metaData } = restProps;

  const styles = metaData.styles[id];
  const mobileStyles = metaData.mobileStyles[id];
  const globalStyles = metaData.globalStyles;

  const { screenType } = useEditorPreview();

  if (!components || !components[id]) return null;

  const { children, gridSize, type } = components[id];

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
      className="grid grid-cols-12 gap-1"
      style={{
        ...(componentStyles as CSSProperties),
      }}
      data-component-type={type}
      data-component-id={id}
    >
      {Array.isArray(children) &&
        children.map((id, index) => (
          <div
            key={id}
            className={cn(
              "w-full h-full col-span-12",
              getColSpan(screenType === "mobile" ? 12 : gridSize?.[index] ?? 12)
            )}
          >
            <Column id={id} parentId={id} {...restProps} />
          </div>
        ))}
    </section>
  );
});

export default Row;
