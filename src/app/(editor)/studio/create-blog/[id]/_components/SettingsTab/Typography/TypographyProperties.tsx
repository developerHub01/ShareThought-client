import React from "react";

import PropertyTypeWrapper from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/PropertyTypeWrapper";
import SettingTypographyProvider from "@/app/(editor)/studio/create-blog/[id]/_context/SettingTab/SettingTypographyProvider";
import TypographyType from "@/app/(editor)/studio/create-blog/[id]/_components/SettingsTab/Typography/TypographyType";
import TypographyFontSize from "@/app/(editor)/studio/create-blog/[id]/_components/SettingsTab/Typography/TypographyFontSize";

const TypographyProperties = () => {
  return (
    <SettingTypographyProvider>
      <PropertyTypeWrapper>
        <TypographyType />
        <TypographyFontSize />
      </PropertyTypeWrapper>
    </SettingTypographyProvider>
  );
};

export default TypographyProperties;
