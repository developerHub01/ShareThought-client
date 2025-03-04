import React from "react";

import PropertyTypeWrapper from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/PropertyTypeWrapper";
import SettingTypographyProvider from "@/app/(editor)/studio/create-blog/[id]/_context/SettingTab/SettingTypographyProvider";
import TypographyType from "@/app/(editor)/studio/create-blog/[id]/_components/SettingsTab/Typography/TypographyType";
import TypographyFontSize from "@/app/(editor)/studio/create-blog/[id]/_components/SettingsTab/Typography/TypographyFontSize";
import TypographyWeight from "@/app/(editor)/studio/create-blog/[id]/_components/SettingsTab/Typography/TypographyWeight";
import TypographyLineHeight from "@/app/(editor)/studio/create-blog/[id]/_components/SettingsTab/Typography/TypographyLineHeight";
import TypographyLetterSpacing from "@/app/(editor)/studio/create-blog/[id]/_components/SettingsTab/Typography/TypographyLetterSpacing";
import TypographyColor from "@/app/(editor)/studio/create-blog/[id]/_components/SettingsTab/Typography/TypographyColor";
import HidePropertyInMobile from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/HidePropertyInMobile";
import TypographyMargin from "@/app/(editor)/studio/create-blog/[id]/_components/SettingsTab/Typography/TypographyMargin";

const TypographyProperties = () => {
  return (
    <SettingTypographyProvider>
      <PropertyTypeWrapper>
        <TypographyType />
        <TypographyFontSize />
        <TypographyWeight />
        <TypographyLetterSpacing />
        <TypographyLineHeight />
        <HidePropertyInMobile>
          <TypographyColor />
        </HidePropertyInMobile>
        <TypographyMargin />
      </PropertyTypeWrapper>
    </SettingTypographyProvider>
  );
};

export default TypographyProperties;
