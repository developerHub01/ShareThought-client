"use client";

import React from "react";
import ImageBlur from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Image/Filters/ImageBlur";
import ImageBrightness from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Image/Filters/ImageBrightness";
import ImageGrayscale from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Image/Filters/ImageGrayscale";
import ImageInvert from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Image/Filters/ImageInvert";
import ImageSepia from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Image/Filters/ImageSepia";
import ImageHueRotate from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Image/Filters/ImageHueRotate";
import ImageContrast from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Image/Filters/ImageContrast";
import ImageSaturation from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Image/Filters/ImageSaturation";
import ImageFilterReset from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Image/Filters/ImageFilterReset";
import ImageOpacity from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Image/Filters/ImageOpacity";

const ImageFilters = () => {
  return (
    <div className="flex flex-col h-full">
      <ImageBlur />
      <ImageBrightness />
      <ImageContrast />
      <ImageGrayscale />
      <ImageInvert />
      <ImageSaturation />
      <ImageSepia />
      <ImageHueRotate />
      <ImageOpacity />
      <ImageFilterReset />
    </div>
  );
};

export default ImageFilters;
