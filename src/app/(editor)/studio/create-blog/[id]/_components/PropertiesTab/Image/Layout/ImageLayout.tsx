import React from "react";
import AlignmentProperty from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/AlignmentProperty";
import ImageWidth from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Image/Layout/ImageWidth";

const ImageLayout = () => {
  return (
    <div className="flex flex-col h-full">
      <ImageWidth />
      <AlignmentProperty />
    </div>
  );
};

export default ImageLayout;
