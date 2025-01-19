import React from "react";
import TableHeaderBackground from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/TableHeaderBackground";
import TableHeaderTextColor from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/TableHeaderTextColor";

const TableHeader = () => {
  return (
    <div className="flex flex-col h-full">
      <TableHeaderBackground />
      <TableHeaderTextColor />
    </div>
  );
};

export default TableHeader;
