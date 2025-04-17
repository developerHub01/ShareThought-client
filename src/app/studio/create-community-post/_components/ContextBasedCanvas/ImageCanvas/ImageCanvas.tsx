"use client";

import React, { memo } from "react";
import { useAppSelector } from "@/redux/hooks";
import { selectCommunityPostImages } from "@/redux/features/create-community-post/selectors";
import ImageUploaderCanvas from "@/app/studio/create-community-post/_components/ContextBasedCanvas/ImageCanvas/ImageUploaderCanvas";
import ImageModifierCanvas from "@/app/studio/create-community-post/_components/ContextBasedCanvas/ImageCanvas/ImageModifierCanvas";

const ImageCanvas = memo(() => {
  const images = useAppSelector((state) => selectCommunityPostImages(state));

  return (
    <>
      {!images || !images?.length ? (
        <ImageUploaderCanvas />
      ) : (
        <ImageModifierCanvas />
      )}
    </>
  );
});

export default ImageCanvas;
