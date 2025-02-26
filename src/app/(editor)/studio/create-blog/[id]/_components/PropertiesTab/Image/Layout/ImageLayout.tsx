import React from "react";
import AlignmentProperty from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/AlignmentProperty";
import ImageWidth from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Image/Layout/ImageWidth";
import ImageHeight from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Image/Layout/ImageHeight";
import PropertyTypeWrapper from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/PropertyTypeWrapper";

const ImageLayout = () => {
  return (
    <PropertyTypeWrapper>
      <ImageWidth />
      <ImageHeight />
      <AlignmentProperty />
    </PropertyTypeWrapper>
  );
};

export default ImageLayout;
