"use client";

import React from "react";
import ImageAlt from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Image/Content/ImageAlt";
import ImageCaption from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Image/Content/ImageCaption";
import useActiveImage from "@/hooks/editor/use-active-image";

const ImageContent = () => {
  const { url } = useActiveImage();

  return (
    <div className="flex flex-col h-full">
      {/* Image URL: Textbox to add or edit the image's URL.  */}

      {url && (
        <>
          <ImageAlt />
          <ImageCaption />
        </>
      )}
    </div>
  );
};

export default ImageContent;
