import React from "react";
import PropertyTypeWrapper from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/PropertyTypeWrapper";
import GapProperty from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/GapProperty";
import HorizontalAlign from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Column/Layout/HorizontalAlign";
import VerticleAlign from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Column/Layout/VerticleAlign";

const ColumnLayout = () => {
  return (
    <PropertyTypeWrapper>
      <GapProperty />
      <HorizontalAlign />
      <VerticleAlign />
    </PropertyTypeWrapper>
  );
};

export default ColumnLayout;
