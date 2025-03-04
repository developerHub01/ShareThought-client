import React from "react";

import PropertyTypeWrapper from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/PropertyTypeWrapper";
import GapProperty from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/GapProperty";
import RowLayoutColumnSize from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Row/Layout/RowLayoutColumnSize";
import HidePropertyInMobile from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/HidePropertyInMobile";

const RowLayout = () => {
  return (
    <PropertyTypeWrapper>
      <GapProperty />
      <HidePropertyInMobile>
        <RowLayoutColumnSize />
      </HidePropertyInMobile>
    </PropertyTypeWrapper>
  );
};

export default RowLayout;
