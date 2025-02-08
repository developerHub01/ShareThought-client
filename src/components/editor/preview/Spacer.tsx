import { cn } from "@/lib/utils";
import {
  BlogComponentsDataInterface,
  BlogContentType,
  BlogMetaDataInterface,
} from "@/redux/features/builders/blogBuilderSlice";
import { useAppSelector } from "@/redux/hooks";
import React from "react";

export interface SpacerProps {
  id: string;
  content: BlogContentType;
  components: BlogComponentsDataInterface;
  metaData: BlogMetaDataInterface;
}

const Spacer = ({ id, metaData }: SpacerProps) => {
  const componentStyles = metaData.styles[id] || {};

  return (
    <div
      className=""
      style={{
        ...(componentStyles as Record<string, string | number>),
      }}
    ></div>
  );
};

export default Spacer;
