import React from "react";
import TableContentFontWeight from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Table/Content/TableContentFontWeight";
import TableContentFontSize from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Table/Content/TableContentFontSize";
import TableContentTextColor from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Table/Content/TableContentTextColor";
import TableContentTextAlign from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Table/Content/TableContentTextAlign";

const TableContent = () => {
  return (
    <div className="flex flex-col h-full">
      <TableContentFontWeight />
      <TableContentFontSize />
      <TableContentTextColor />
      <TableContentTextAlign />
    </div>
  );
};

export default TableContent;
