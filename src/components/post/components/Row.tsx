import {
  BlogComponentsDataInterface,
  BlogContentType,
  BlogMetaDataInterface,
  StyleType,
} from "@/redux/features/builders/blogBuilderSlice";
import React, { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import Column from "@/components/post/components/Column";
import handleBorderStyle from "@/utils/editor/handleBorderStyle";
import handleBoxShadow from "@/utils/editor/handleBoxShadow";

interface RowProps {
  id: string;
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

const Row = (props: RowProps) => {
  const { id, ...restProps } = props;

  const {
    components,
    metaData: { styles = {} },
  } = restProps;

  if (!components || !components[id]) return null;

  const { children, gridSize, type } = components[id];

  let componentStyles: StyleType = styles[id] || {};

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
      className="grid grid-cols-12"
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
              getColSpan(gridSize?.[index] ?? 12)
            )}
          >
            <Column {...restProps} id={id} />
          </div>
        ))}
    </section>
  );
};

export default Row;
