import React, { CSSProperties } from "react";

import {
  BlockquoteInterface,
  BlogComponentsDataInterface,
  BlogContentType,
  BlogMetaDataInterface,
} from "@/redux/features/builders/blogBuilderSlice";
import BlockquoteComponent from "@/components/ui/blockquote";

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

  const styles = metaData.styles?.[id] as CSSProperties;

  if (!component || component.type !== "blockquote" || !component?.children)
    return null;

  const blockquoteData = component.children as BlockquoteInterface;

  return <BlockquoteComponent {...blockquoteData} styles={styles} />;
};

export default Blockquote;
