"use client";

import React from "react";
import Heading from "@/components/editor/components/Heading";
import Row from "@/components/editor/components/Row";
import Table from "@/components/editor/components/Table";
import Image from "@/components/editor/components/Image";
import ButtonComponent from "@/components/editor/components/Button";
import Spacer from "@/components/editor/components/Spacer";
import Divider from "@/components/editor/components/Divider";
import Code from "@/components/editor/components/Code";
import Accordion from "@/components/editor/components/Accordion";
import BlockComponentWrapper from "@/app/(editor)/studio/create-blog/[id]/_components/BlockComponentWrapper";
import { useParams } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";

const Block = ({ id }: { id: string }) => {
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return null;

  const { components } = useAppSelector(
    (state) => state.blogBuilder.blogs[blogId]
  );
  const component = components[id];

  if (!component) return null;

  const { type } = component;

  if (["h1", "h2", "h3", "h4", "h5", "h6", "p"].includes(type)) {
    return <Heading id={id} />;
  } else if (type === "button") {
    return <ButtonComponent id={id} />;
  } else if (type === "row") {
    return <Row id={id} />;
  } else if (type === "table") {
    return <Table id={id} />;
  } else if (type === "image") {
    return <Image id={id} />;
  } else if (type === "spacer") {
    return <Spacer id={id} />;
  } else if (type === "divider") {
    return <Divider id={id} />;
  } else if (type === "code") {
    return <Code id={id} />;
  } else if (type === "accordion") {
    return <Accordion id={id} />;
  }
  return null;
};

const BlockComponent = ({
  lavel,
  id,
  ...props
}: {
  lavel?: number;
  id: string;
}) => {
  return (
    <BlockComponentWrapper
      id={id}
      className="w-full max-w-3xl rounded-sm"
      lavel={lavel}
    >
      <Block id={id} />
    </BlockComponentWrapper>
  );
};

export default BlockComponent;
