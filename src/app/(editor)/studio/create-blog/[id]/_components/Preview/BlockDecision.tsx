import React from "react";

import {
  BlogComponentsDataInterface,
  BlogContentType,
  BlogMetaDataInterface,
} from "@/redux/features/builders/blogBuilderSlice";
import Image from "@/components/post/components/Image";
import Heading from "@/app/(editor)/studio/create-blog/[id]/_components/Preview/Components/Heading";
import Row from "@/app/(editor)/studio/create-blog/[id]/_components/Preview/Components/Row";
import Button from "@/app/(editor)/studio/create-blog/[id]/_components/Preview/Components/Button";
import Spacer from "@/app/(editor)/studio/create-blog/[id]/_components/Preview/Components/Spacer";
import Divider from "@/app/(editor)/studio/create-blog/[id]/_components/Preview/Components/Divider";
import Table from "@/app/(editor)/studio/create-blog/[id]/_components/Preview/Components/Table";
import Blockquote from "@/app/(editor)/studio/create-blog/[id]/_components/Preview/Components/Blockquote";
import Code from "@/components/post/components/Code";
import Video from "@/components/post/components/Video";

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
  } else if (component.type === "video") {
    return <Video {...props} />;
  } else if (component.type === "button") {
    return <Button {...props} />;
  } else if (component.type === "spacer") {
    return <Spacer {...props} />;
  } else if (component.type === "divider") {
    return <Divider {...props} />;
  } else if (component.type === "code") {
    return <Code {...props} />;
  } else if (component.type === "blockquote") {
    return <Blockquote {...props} />;
  }
  // else if (component.type === "accordion") {
  //   return <Accordion {...(props as AccordionProps)} />;
  // }
  return <></>;
};

export default BlockDecision;
