import React from "react";
import TableHeaderBackground from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Table/TableHeaderBackground";
import TableHeaderTextColor from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Table/TableHeaderTextColor";
import TableHeaderFontSize from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Table/TableHeaderFontSize";
import TableHeaderFontWeight from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Table/TableHeaderFontWeight";

const TableHeader = () => {
  return (
    <div className="flex flex-col h-full">
      <TableHeaderBackground />
      <TableHeaderTextColor />
      <TableHeaderFontSize />
      <TableHeaderFontWeight />
    </div>
  );
};

export default TableHeader;
