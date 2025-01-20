import React from "react";
import TableContentFontWeight from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Table/Content/TableContentFontWeight";
import TableContentFontSize from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Table/Content/TableContentFontSize";

const TableContent = () => {
  return (
    <div className="flex flex-col h-full">
      <TableContentFontWeight />
      <TableContentFontSize />
    </div>
  );
};

export default TableContent;
