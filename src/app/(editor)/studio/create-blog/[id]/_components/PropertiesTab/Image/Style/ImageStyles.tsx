import React from "react";
import BorderRadiusProperty from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/BorderRadiusProperty";
import BorderProperty from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/BorderProperty";
import OpacityProperty from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/OpacityProperty";

const ImageStyles = () => {
  return (
    <div className="flex flex-col h-full">
      {/* Border: Add border styles (e.g., width, color, style).  */}
      <BorderProperty />
      {/* Shadow: Add shadow effects to the image.  */}
      {/* Opacity: Adjust transparency level.  */}
      <OpacityProperty />
      {/* Border Radius: Add rounded corners.  */}
      <BorderRadiusProperty />
      {/* Filters: Apply effects (e.g., grayscale, brightness, contrast). */}
    </div>
  );
};

export default ImageStyles;
