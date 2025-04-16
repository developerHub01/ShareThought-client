"use client";

import { memo } from "react";
import { useImagePost } from "@/app/studio/create-community-post/_context/ImagePostProvider";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { selectCommunityPostImages } from "@/redux/features/create-community-post/selectors";
import { useAppSelector } from "@/redux/hooks";

const RightFallback = memo(() => {
  const images =
    useAppSelector((state) => selectCommunityPostImages(state)) ?? [];
  const { setSelectedId } = useImagePost();

  const handleSelect = () => {
    if (!images.length) return;
    setSelectedId(images[Math.round(Math.random() * (images.length - 1))].id);
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center text-center select-none">
      <div className="max-w-44">
        <p>Please select an image</p>
        <div className="flex justify-center items-center gap-2 pb-3">
          <Separator className="w-12 h-[2px] bg-primary" />
          <p>or</p>
          <Separator className="w-12 h-[2px] bg-primary" />
        </div>
        <Button onClick={handleSelect}>Select Randomly</Button>
      </div>
    </div>
  );
});

export default RightFallback;
