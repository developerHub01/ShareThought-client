import React from "react";

import PropertyTypeWrapper from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/PropertyTypeWrapper";
import SettingTypographyProvider from "@/app/(editor)/studio/create-blog/[id]/_context/SettingTab/SettingTypographyProvider";
import CodeThemeMode from "@/app/(editor)/studio/create-blog/[id]/_components/SettingsTab/Code/CodeThemeMode";

const CodeProperties = () => {
  return (
    <SettingTypographyProvider>
      <PropertyTypeWrapper>
        <CodeThemeMode />
      </PropertyTypeWrapper>
    </SettingTypographyProvider>
  );
};

export default CodeProperties;
