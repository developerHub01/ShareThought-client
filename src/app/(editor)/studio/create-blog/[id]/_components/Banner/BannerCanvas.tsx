import React from "react";
import { ImageIcon } from "@/lib/icons";
import CanvasWrapper from "@/app/(editor)/studio/create-blog/[id]/_components/Banner/CanvasWrapper";

const BannerCanvas = () => {
  return (
    <CanvasWrapper>
      <div className="flex flex-col justify-center items-center gap-4 z-10 text-center">
        <ImageIcon className="size-6 md:size-12 lg:size-20" />
        <p className="text-xs md:text-base">Drop blog banner here...</p>
        <label
          htmlFor="bannerImageUploader"
          className="cursor-pointer bg-primary-foreground hover:bg-primary-foreground/80 text-primary px-4 py-1.5 rounded-sm"
        >
          Upload
        </label>
      </div>
    </CanvasWrapper>
  );
};

export default BannerCanvas;
