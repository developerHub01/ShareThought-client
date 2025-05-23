import {
  BlogComponentsDataInterface,
  BlogContentType,
  BlogMetaDataInterface,
} from "@/redux/features/builders/blogBuilderSlice";
import React, { CSSProperties } from "react";

export interface SpacerProps {
  id: string;
  content: BlogContentType;
  components: BlogComponentsDataInterface;
  metaData: BlogMetaDataInterface;
}

const Spacer = ({ id, metaData, components }: SpacerProps) => {
  if (!components || !components[id]) return null;

  const componentStyles = metaData.styles[id] || {};

  const { type } = components[id];

  return (
    <div
      className=""
      style={{
        ...(componentStyles as CSSProperties),
      }}
      data-component-type={type}
      data-component-id={id}
    ></div>
  );
};

export default Spacer;
