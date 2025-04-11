import React from "react";
import PropertyTypeWrapper from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/PropertyTypeWrapper";
import TypographyProperties from "@/app/(editor)/studio/create-blog/[id]/_components/SettingsTab/Typography/TypographyProperties";
import GapProperties from "@/app/(editor)/studio/create-blog/[id]/_components/SettingsTab/Gap/GapProperties";
import { Accordion } from "@/components/ui/accordion";
import CodeProperties from "@/app/(editor)/studio/create-blog/[id]/_components/SettingsTab/Code/CodeProperties";
import HidePropertyInMobile from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/HidePropertyInMobile";

const SettingTab = () => {
  return (
    <div className="w-full h-full">
      <Accordion type="multiple" className="h-full w-full">
        <PropertyTypeWrapper id="typography" label="Typography">
          <TypographyProperties />
        </PropertyTypeWrapper>
        <PropertyTypeWrapper id="gap" label="Gap">
          <GapProperties />
        </PropertyTypeWrapper>
        <HidePropertyInMobile>
          <PropertyTypeWrapper id="code" label="Code">
            <CodeProperties />
          </PropertyTypeWrapper>
        </HidePropertyInMobile>
      </Accordion>
    </div>
  );
};

export default SettingTab;
