"use client";

import React from "react";
import ImageAlt from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Image/Content/ImageAlt";
import ImageCaption from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Image/Content/ImageCaption";
import ImageUrl from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Image/Content/ImageUrl";
import ImageActions from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Image/Content/ImageActions";
import useActiveImage from "@/hooks/editor/use-active-image";
import ComponentLinkProperty from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/ComponentLinkProperty";

const ImageContent = () => {
  const { url } = useActiveImage();

  return (
    <div className="flex flex-col h-full">
      <ImageActions />
      <ImageUrl />

      {url && (
        <>
          <ImageAlt />
          <ImageCaption />
          <ComponentLinkProperty />
        </>
      )}
    </div>
  );
};

export default ImageContent;
