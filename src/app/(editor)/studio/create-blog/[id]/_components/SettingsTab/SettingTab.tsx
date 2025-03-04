import React from "react";
import PropertyTypeWrapper from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/PropertyTypeWrapper";
import TypographyProperties from "@/app/(editor)/studio/create-blog/[id]/_components/SettingsTab/Typography/TypographyProperties";
import { Accordion } from "@/components/ui/accordion";

const SettingTab = () => {
  return (
    <div className="w-full h-full">
      <Accordion type="multiple" className="h-full w-full">
        <PropertyTypeWrapper id="typography" label="Typography">
          <TypographyProperties />
        </PropertyTypeWrapper>
      </Accordion>
    </div>
  );
};

export default SettingTab;
