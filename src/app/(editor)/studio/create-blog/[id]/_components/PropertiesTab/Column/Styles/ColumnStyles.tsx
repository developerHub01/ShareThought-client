import React from "react";
import PropertyTypeWrapper from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/PropertyTypeWrapper";
import PaddingProperty from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/PaddingProperty";
import BoxShadowProperty from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/BoxShadowProperty";
import BorderProperty from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/BorderProperty";
import BorderRadiusProperty from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/BorderRadiusProperty";
import GapProperty from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/GapProperty";

const ColumnStyles = () => {
  return (
    <PropertyTypeWrapper>
      <GapProperty />
      <PaddingProperty />
      <BorderProperty />
      <BorderRadiusProperty />
      <BoxShadowProperty />
    </PropertyTypeWrapper>
  );
};

export default ColumnStyles;
