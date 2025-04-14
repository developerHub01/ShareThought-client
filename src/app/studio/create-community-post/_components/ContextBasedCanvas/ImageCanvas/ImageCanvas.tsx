"use client";

import React from "react";
import ImageCanvasWrapper from "@/app/studio/create-community-post/_components/ContextBasedCanvas/ImageCanvas/ImageCanvasWrapper";
import { useAppSelector } from "@/redux/hooks";
import { selectCommunityPostImages } from "@/redux/features/create-community-post/selectors";
import ImageUploaderCanvas from "@/app/studio/create-community-post/_components/ContextBasedCanvas/ImageCanvas/ImageUploaderCanvas";
import ImageModifierCanvas from "@/app/studio/create-community-post/_components/ContextBasedCanvas/ImageCanvas/ImageModifierCanvas";

const ImageCanvas = () => {
  const images = useAppSelector((state) => selectCommunityPostImages(state));

  return (
    <ImageCanvasWrapper>
      {!images || !images?.length ? (
        <ImageUploaderCanvas />
      ) : (
        <ImageModifierCanvas />
      )}
    </ImageCanvasWrapper>
  );
};

export default ImageCanvas;
