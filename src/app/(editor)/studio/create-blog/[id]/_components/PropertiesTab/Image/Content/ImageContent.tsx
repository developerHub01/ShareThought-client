import React from "react";
import ImageAlt from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Image/Content/ImageAlt";

const ImageContent = () => {
  return (
    <div className="flex flex-col h-full">
      {/* Image URL: Textbox to add or edit the image's URL.  */}
      {/* Alt Text: Input field for alternative text (for accessibility and SEO).  */}
      <ImageAlt />
      {/* Caption: Option to add a caption below the image. */}
    </div>
  );
};

export default ImageContent;
