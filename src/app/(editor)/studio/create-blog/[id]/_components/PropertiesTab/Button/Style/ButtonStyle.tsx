import React from "react";

import PropertyTypeWrapper from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/PropertyTypeWrapper";
import FontSizeProperty from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/Font/FontSizeProperty";
import FontWeightProperty from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/Font/FontWeightProperty";
import TextColorProperty from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/Font/TextColorProperty";
import LetterSpacingProperty from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/Font/LetterSpacingProperty";
import LineHeightProperty from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/Font/LineHeightProperty";
import TextTransformProperty from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/Font/TextTransformProperty";
import TextDirectionProperty from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/Font/TextDirectionProperty";

const ButtonStyle = () => {
  return (
    <PropertyTypeWrapper>
      <FontSizeProperty />
      <FontWeightProperty />
      <TextColorProperty />
      <LetterSpacingProperty />
      <LineHeightProperty />
      <TextTransformProperty />
      <TextDirectionProperty />
    </PropertyTypeWrapper>
  );
};

export default ButtonStyle;
