import React from "react";
import PropertyTypeWrapper from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/PropertyTypeWrapper";
import GapProperty from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/GapProperty";
import VerticleAlign from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Column/Layout/VerticleAlign";
import HidePropertyInMobile from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/HidePropertyInMobile";

const ColumnLayout = () => {
  return (
    <PropertyTypeWrapper>
      <GapProperty />
      <HidePropertyInMobile>
        <VerticleAlign />
      </HidePropertyInMobile>
    </PropertyTypeWrapper>
  );
};

export default ColumnLayout;
