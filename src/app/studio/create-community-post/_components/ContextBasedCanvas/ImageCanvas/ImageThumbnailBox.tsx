"use client";

import React from "react";
import Image from "next/image";
import { Reorder } from "framer-motion";
import { cn } from "@/lib/utils";
import { RemoveIcon } from "@/lib/icons";
import { useImagePost } from "@/app/studio/create-community-post/_context/ImagePostProvider";

interface ImageThumbnailBoxProps {
  image: {
    id: string;
    url: string;
  };
  onDelete: () => void;
  className?: string;
  [key: string]: unknown;
}

const ImageThumbnailBox = ({
  image,
  className,
  onDelete,
  ...props
}: ImageThumbnailBoxProps) => {
  const { id, url } = image;
  const { selectedId, setSelectedId } = useImagePost();

  return (
    <Reorder.Item
      value={image}
      id={id}
      className={cn(
        "w-full aspect-square rounded-md cursor-grab relative group",
        className
      )}
      {...props}
    >
      <div
        className={cn("w-full h-full rounded-md", {
          "ring-2 ring-offset-1 ring-primary": id === selectedId,
        })}
        onClick={() => setSelectedId(id)}
      >
        <button
          type="button"
          onClick={onDelete}
          className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 opacity-0 scale-90 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto bg-red-500 text-white rounded-md p-1.5 aspect-1"
        >
          <RemoveIcon size={16} />
        </button>
        <Image
          src={url}
          alt="community post image"
          width={100}
          height={100}
          className="w-full h-full object-cover rounded-md pointer-events-none"
        />
      </div>
    </Reorder.Item>
  );
};

export default ImageThumbnailBox;
