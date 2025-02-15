import React from "react";
import ButtonContentText from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Button/Content/ButtonContentText";
import ComponentLinkProperty from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/ComponentLinkProperty";
import PropertyTypeWrapper from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/PropertyTypeWrapper";

const ButtonContent = () => {
  return (
    <PropertyTypeWrapper>
      <ButtonContentText />
      <ComponentLinkProperty />
    </PropertyTypeWrapper>
  );
};

export default ButtonContent;
