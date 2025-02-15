import React from "react";
import AlignmentProperty from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/AlignmentProperty";
import DividerWidth from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Divider/Layout/DividerWidth";
import DividerLine from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Divider/Layout/DividerLine";
import PropertyTypeWrapper from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/PropertyTypeWrapper";

const DividerLayout = () => {
  return (
    <PropertyTypeWrapper>
      <DividerLine />
      <DividerWidth />
      <AlignmentProperty />
    </PropertyTypeWrapper>
  );
};

export default DividerLayout;
