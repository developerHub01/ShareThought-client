import React from "react";
import {
  BlogComponentsDataInterface,
  BlogContentType,
  BlogMetaDataInterface,
  StyleType,
} from "@/redux/features/builders/blogBuilderSlice";
import handleBorderStyle from "@/utils/editor/handleBorderStyle";
import handleWrapperContentStyleSeparator from "@/utils/editor/handleWrapperContentStyleSeparator";

export interface DividerProps {
  id: string;
  content: BlogContentType;
  components: BlogComponentsDataInterface;
  metaData: BlogMetaDataInterface;
}

const Divider = ({ id, metaData, components }: DividerProps) => {
  if (!components || !components[id]) return null;

  const { type } = components[id];
  const componentStyles = metaData.styles[id] || {};

  let { contentStyles, wrapperStyles } =
    handleWrapperContentStyleSeparator(componentStyles);

  contentStyles = {
    ...contentStyles,
    ...handleBorderStyle(contentStyles as StyleType),
  };

  if (contentStyles.width) contentStyles.width = `${contentStyles.width}%`;

  return (
    <div
      className="flex"
      style={{
        ...(wrapperStyles as Record<string, string | number>),
      }}
      data-component-type={type}
      data-component-id={id}
    >
      <div
        style={{
          ...contentStyles,
        }}
      ></div>
    </div>
  );
};

export default Divider;
