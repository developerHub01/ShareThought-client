"use client";

import React, { memo } from "react";
import { useImagePost } from "@/app/studio/create-community-post/_context/ImagePostProvider";
import ImageEditor from "@/app/studio/create-community-post/_components/ContextBasedCanvas/ImageCanvas/Right/ImageEditor";
import ImagePreview from "@/app/studio/create-community-post/_components/ContextBasedCanvas/ImageCanvas/Right/ImagePreview";
import ImageMainActions from "@/app/studio/create-community-post/_components/ContextBasedCanvas/ImageCanvas/Right/ImageMainActions";
import { Separator } from "@/components/ui/separator";
import RightFallback from "@/app/studio/create-community-post/_components/ContextBasedCanvas/ImageCanvas/Right/RightFallback";

const ImageMain = memo(() => {
  const { isEditorMode, selectedId } = useImagePost();

  return (
    <div className="w-full p-2.5 flex flex-col gap-2">
      {selectedId ? (
        <>
          <MainCanvas isEditorMode={isEditorMode} />
          <Separator />
          <ImageMainActions />
        </>
      ) : (
        <RightFallback />
      )}
    </div>
  );
});

interface MainCanvasProps {
  isEditorMode: boolean;
}

const MainCanvas = memo(({ isEditorMode }: MainCanvasProps) => {
  return (
    <div className="w-full h-full flex-1 max-h-[500px]">
      {isEditorMode ? <ImageEditor /> : <ImagePreview />}
    </div>
  );
});

export default ImageMain;
