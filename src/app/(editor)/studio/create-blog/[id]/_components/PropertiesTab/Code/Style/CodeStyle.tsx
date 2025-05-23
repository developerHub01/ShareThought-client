import React from "react";

import PropertyTypeWrapper from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/PropertyTypeWrapper";
import MarginProperty from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/MarginProperty";
import HidePropertyInMobile from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/HidePropertyInMobile";
import BackgroundColorProperty from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/BackgroundColorProperty";
import BorderProperty from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/BorderProperty";
import BorderRadiusProperty from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/BorderRadiusProperty";
import CodeThemeMode from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Code/Style/CodeThemeMode";

const CodeStyle = () => {
  return (
    <>
      <PropertyTypeWrapper>
        <HidePropertyInMobile>
          <CodeThemeMode />
          <BackgroundColorProperty />
          <BorderProperty />
          <BorderRadiusProperty />
        </HidePropertyInMobile>
        <MarginProperty />
      </PropertyTypeWrapper>
    </>
  );
};

export default CodeStyle;
