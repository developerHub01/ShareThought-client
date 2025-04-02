"use client";

import React, { memo } from "react";
import Heading from "@/app/(editor)/studio/create-blog/[id]/_components/Components/Heading";
import Row from "@/app/(editor)/studio/create-blog/[id]/_components/Components/Row";
import Table from "@/app/(editor)/studio/create-blog/[id]/_components/Components/Table";
import Image from "@/app/(editor)/studio/create-blog/[id]/_components/Components/Image";
import ButtonComponent from "@/app/(editor)/studio/create-blog/[id]/_components/Components/Button";
import Spacer from "@/app/(editor)/studio/create-blog/[id]/_components/Components/Spacer";
import Divider from "@/app/(editor)/studio/create-blog/[id]/_components/Components/Divider";
import Code from "@/app/(editor)/studio/create-blog/[id]/_components/Components/Code";
import Accordion from "@/app/(editor)/studio/create-blog/[id]/_components/Components/Accordion";
import BlockComponentWrapper from "@/app/(editor)/studio/create-blog/[id]/_components/BlockComponentWrapper";
import { useParams } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { selectBlogComponentById } from "@/redux/features/builders/selectors";

const Block = memo(({ id, parentId }: { id: string; parentId?: string }) => {
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return null;

  const component = useAppSelector((state) =>
    selectBlogComponentById(state, blogId, id)
  );

  if (!component) return null;
  
  const { type } = component;

  if (["h1", "h2", "h3", "h4", "h5", "h6", "p"].includes(type)) {
    return <Heading id={id} parentId={parentId} />;
  } else if (type === "button") {
    return <ButtonComponent id={id} parentId={parentId} />;
  } else if (type === "row") {
    return <Row id={id} parentId={parentId} />;
  } else if (type === "table") {
    return <Table id={id} parentId={parentId} />;
  } else if (type === "image") {
    return <Image id={id} parentId={parentId} />;
  } else if (type === "spacer") {
    return <Spacer id={id} parentId={parentId} />;
  } else if (type === "divider") {
    return <Divider id={id} parentId={parentId} />;
  } else if (type === "code") {
    return <Code id={id} parentId={parentId} />;
  } else if (type === "accordion") {
    return <Accordion id={id} parentId={parentId} />;
  }
  return null;
});

const BlockComponent = ({
  lavel,
  id,
  parentId,
  ...props
}: {
  lavel?: number;
  id: string;
  parentId?: string;
}) => {
  return (
    <BlockComponentWrapper id={id} lavel={lavel}>
      <Block id={id} parentId={parentId} />
    </BlockComponentWrapper>
  );
};

export default BlockComponent;
