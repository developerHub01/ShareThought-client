import React from "react";
import ButtonContentText from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Button/Content/ButtonContentText";
import ComponentLinkProperty from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/ComponentLinkProperty";

const ButtonContent = () => {
  return (
    <div className="flex flex-col h-full">
      <ButtonContentText />
      <ComponentLinkProperty />
    </div>
  );
};

export default ButtonContent;
