import React from "react";
import TableContentFontWeight from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Table/Content/TableContentFontWeight";
import TableContentFontSize from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Table/Content/TableContentFontSize";
import TableContentTextColor from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Table/Content/TableContentTextColor";
import TableContentTextAlign from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Table/Content/TableContentTextAlign";
import TableContentTextDirection from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Table/Content/TableContentTextDirection";
import TableContentLetterSpacing from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Table/Content/TableContentLetterSpacing";
import TableContentLineHeight from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Table/Content/TableContentLineHeight";
import PropertyTypeWrapper from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/PropertyTypeWrapper";

const TableContent = () => {
  return (
    <PropertyTypeWrapper>
      <TableContentFontWeight />
      <TableContentFontSize />
      <TableContentTextColor />
      <TableContentTextAlign />
      <TableContentTextDirection />
      <TableContentLetterSpacing />
      <TableContentLineHeight />
    </PropertyTypeWrapper>
  );
};

export default TableContent;
