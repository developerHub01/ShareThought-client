import React from "react";
import TableHeaderBackground from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Table/Header/TableHeaderBackground";
import TableHeaderTextColor from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Table/Header/TableHeaderTextColor";
import TableHeaderFontSize from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Table/Header/TableHeaderFontSize";
import TableHeaderFontWeight from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Table/Header/TableHeaderFontWeight";
import TableHeaderTextAlign from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Table/Header/TableHeaderTextAlign";
import PropertyTypeWrapper from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/PropertyTypeWrapper";

const TableHeader = () => {
  return (
    <PropertyTypeWrapper>
      <TableHeaderBackground />
      <TableHeaderTextColor />
      <TableHeaderFontSize />
      <TableHeaderFontWeight />
      <TableHeaderTextAlign />
    </PropertyTypeWrapper>
  );
};

export default TableHeader;
