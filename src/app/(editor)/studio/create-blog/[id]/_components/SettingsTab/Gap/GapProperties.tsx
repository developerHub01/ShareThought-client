import React from "react";

import PropertyTypeWrapper from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/PropertyTypeWrapper";
import SettingTypographyProvider from "@/app/(editor)/studio/create-blog/[id]/_context/SettingTab/SettingTypographyProvider";
import GapSize from "@/app/(editor)/studio/create-blog/[id]/_components/SettingsTab/Gap/GapSize";

const GapProperties = () => {
  return (
    <SettingTypographyProvider>
      <PropertyTypeWrapper>
        <GapSize type="row" label="Row Gap" />
        <GapSize type="column" label="Column Gap" />
      </PropertyTypeWrapper>
    </SettingTypographyProvider>
  );
};

export default GapProperties;
