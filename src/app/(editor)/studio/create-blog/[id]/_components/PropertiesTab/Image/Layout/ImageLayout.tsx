import React from "react";
import AlignmentProperty from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/AlignmentProperty";
import ImageWidth from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Image/Layout/ImageWidth";
import ImageHeight from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Image/Layout/ImageHeight";
import PropertyTypeWrapper from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/PropertyTypeWrapper";
import ImageObjectFit from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Image/Layout/ImageObjectFit";

const ImageLayout = () => {
  return (
    <PropertyTypeWrapper>
      <ImageWidth />
      <ImageHeight />
      <ImageObjectFit />
      <AlignmentProperty />
    </PropertyTypeWrapper>
  );
};

export default ImageLayout;
