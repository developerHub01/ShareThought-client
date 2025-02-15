import React from "react";

import TypographyContentType from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Typography/Content/TypographyContentType";
import PropertyTypeWrapper from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/PropertyTypeWrapper";

const TypographyContent = () => {
  return (
    <PropertyTypeWrapper>
      <TypographyContentType />
    </PropertyTypeWrapper>
  );
};

export default TypographyContent;
