"use client";

import React from "react";
import AlignmentProperty from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/AlignmentProperty";
import DividerWidth from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Divider/Layout/DividerWidth";
import DividerLine from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Divider/Layout/DividerLine";

const DividerLayout = () => {
  return (
    <div className="flex flex-col h-full">
      <DividerLine />
      <DividerWidth />
      <AlignmentProperty />
    </div>
  );
};

export default DividerLayout;
