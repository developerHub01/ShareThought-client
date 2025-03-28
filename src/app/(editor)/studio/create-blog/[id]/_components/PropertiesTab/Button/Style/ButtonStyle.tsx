import React from "react";

import PropertyTypeWrapper from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/PropertyTypeWrapper";
import FontSizeProperty from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/Font/FontSizeProperty";
import FontWeightProperty from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/Font/FontWeightProperty";
import TextColorProperty from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/Font/TextColorProperty";
import LetterSpacingProperty from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/Font/LetterSpacingProperty";
import LineHeightProperty from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/Font/LineHeightProperty";
import TextTransformProperty from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/Font/TextTransformProperty";
import TextDirectionProperty from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/Font/TextDirectionProperty";
import BorderProperty from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/BorderProperty";
import BorderRadiusProperty from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/BorderRadiusProperty";
import AlignmentProperty from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/AlignmentProperty";
import ButtonWidth from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Button/Style/ButtonWidth";
import PaddingProperty from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/PaddingProperty";
import BoxShadowProperty from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/BoxShadowProperty";
import BackgroundColorProperty from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/BackgroundColorProperty";
import HidePropertyInMobile from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/HidePropertyInMobile";

const ButtonStyle = () => {
  return (
    <PropertyTypeWrapper>
      <ButtonWidth />
      <FontSizeProperty />
      <FontWeightProperty />
      <HidePropertyInMobile>
        <TextColorProperty />
        <BackgroundColorProperty />
      </HidePropertyInMobile>
      <LetterSpacingProperty />
      <LineHeightProperty />
      <HidePropertyInMobile>
        <TextTransformProperty />
        <TextDirectionProperty />
        <BorderProperty />
        <BorderRadiusProperty />
        <AlignmentProperty />
      </HidePropertyInMobile>
      <HidePropertyInMobile>
        <BoxShadowProperty />
      </HidePropertyInMobile>
      <PaddingProperty label="Inner Padding" />
    </PropertyTypeWrapper>
  );
};

export default ButtonStyle;
