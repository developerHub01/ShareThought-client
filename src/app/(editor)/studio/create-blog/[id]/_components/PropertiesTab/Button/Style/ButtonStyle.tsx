import React from "react";

import PropertyTypeWrapper from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/PropertyTypeWrapper";
import FontSizeProperty from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/FontSizeProperty";
import FontWeightProperty from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/FontWeightProperty";
import TextColorProperty from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/TextColorProperty";
import LetterSpacingProperty from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/LetterSpacingProperty";
import LineHeightProperty from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/LineHeightProperty";
import TextTransformProperty from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/TextTransformProperty";
import TextDirectionProperty from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/TextDirectionProperty";

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
