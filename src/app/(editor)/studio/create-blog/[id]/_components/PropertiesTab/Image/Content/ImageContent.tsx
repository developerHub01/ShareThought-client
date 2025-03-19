"use client";

import React, { memo } from "react";
import ImageAlt from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Image/Content/ImageAlt";
import ImageCaption from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Image/Content/ImageCaption";
import ImageUrl from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Image/Content/ImageUrl";
import ImageActions from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Image/Content/ImageActions";
import useActiveImage from "@/hooks/editor/use-active-image";
import ComponentLinkProperty from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/ComponentLinkProperty";
import PropertyTypeWrapper from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/PropertyTypeWrapper";

const ImageContent = memo(() => {
  const { url } = useActiveImage();

  return (
    <PropertyTypeWrapper>
      <ImageActions />
      <ImageUrl />

      {url && (
        <>
          <ImageAlt />
          <ImageCaption />
          <ComponentLinkProperty />
        </>
      )}
    </PropertyTypeWrapper>
  );
});

export default ImageContent;
