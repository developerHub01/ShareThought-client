import React from "react";

import BlockquoteQuote from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Blockquote/Content/BlockquoteQuote";
import BlockquoteAuthor from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Blockquote/Content/BlockquoteAuthor";
import BlockquoteVariant from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Blockquote/Content/BlockquoteVariant";
import PropertyTypeWrapper from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/PropertyTypeWrapper";

const BlockquoteContent = () => {
  return (
    <PropertyTypeWrapper>
      <BlockquoteQuote />
      <BlockquoteAuthor />
      <BlockquoteVariant />
    </PropertyTypeWrapper>
  );
};

export default BlockquoteContent;
