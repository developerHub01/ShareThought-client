import React from "react";
import PropertyWrapper_v1 from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/PropertyWrapper_v1";
import ResponsiveToggleBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/ResponsiveToggleBlock";

const TabScreenMode = () => {
  return (
    <PropertyWrapper_v1 className="flex flex-col py-1.5 gap-3 border-t">
      <div className="w-full flex justify-between items-center gap-3 flex-wrap">
        <label htmlFor="screenType" className="text-sm">
          Device Size
        </label>
        <ResponsiveToggleBlock orientation="vertical" />
      </div>
    </PropertyWrapper_v1>
  );
};

export default TabScreenMode;
