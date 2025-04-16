"use client";

import React from "react";
import { useImagePost } from "@/app/studio/create-community-post/_context/ImagePostProvider";
import ImageEditor from "@/app/studio/create-community-post/_components/ContextBasedCanvas/ImageCanvas/ImageEditor";
import ImagePreview from "@/app/studio/create-community-post/_components/ContextBasedCanvas/ImageCanvas/ImagePreview";
import ImageMainActions from "@/app/studio/create-community-post/_components/ContextBasedCanvas/ImageCanvas/ImageMainActions";
import { Separator } from "@/components/ui/separator";

const ImageMain = () => {
  const { isEditorMode, selectedId } = useImagePost();

  if (!selectedId) return null;

  return (
    <div className="w-full p-2.5 flex flex-col gap-2">
      <div className="w-full h-full flex-1 max-h-[500px]">
        {isEditorMode ? <ImageEditor /> : <ImagePreview />}
      </div>
      <Separator />
      <ImageMainActions />
    </div>
  );
};

export default ImageMain;
