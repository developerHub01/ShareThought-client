import React from "react";

import Button from "@/components/post/components/Button";
import Divider from "@/components/post/components/Divider";
import Heading from "@/components/post/components/Heading";
import Image from "@/components/post/components/Image";
import Row from "@/components/post/components/Row";
import Spacer from "@/components/post/components/Spacer";
import Table from "@/components/post/components/Table";
import Blockquote from "@/components/post/components/Blockquote";
import {
  BlogComponentsDataInterface,
  BlogContentType,
  BlogMetaDataInterface,
} from "@/redux/features/builders/blogBuilderSlice";

interface BlockDecisionProps {
  id: string;
  content: BlogContentType;
  components: BlogComponentsDataInterface;
  metaData: BlogMetaDataInterface;
}
const BlockDecision = (props: BlockDecisionProps) => {
  const { id, components } = props;
  const component = components[id];

  if (!component) return null;

  return <ComponentSelector {...props} />;
};

const ComponentSelector = (props: BlockDecisionProps) => {
  const { id, components } = props;
  const component = components[id];

  if (["h1", "h2", "h3", "h4", "h5", "h6", "p"].includes(component.type)) {
    return <Heading {...props} />;
  } else if (component.type === "row") {
    return <Row {...props} />;
  } else if (component.type === "table") {
    return <Table {...props} />;
  } else if (component.type === "image") {
    return <Image {...props} />;
  } else if (component.type === "button") {
    return <Button {...props} />;
  } else if (component.type === "spacer") {
    return <Spacer {...props} />;
  } else if (component.type === "divider") {
    return <Divider {...props} />;
  } else if (component.type === "blockquote") {
    return <Blockquote {...props} />;
  }
  // else if (component.type === "code") {
  //   return <Code {...(props as CodeProps)} />;
  // }
  // else if (component.type === "accordion") {
  //   return <Accordion {...(props as AccordionProps)} />;
  // }
  return <></>;
};

export default BlockDecision;
