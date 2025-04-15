"use client";

import React from "react";
import Image from "next/image";
import { Reorder } from "framer-motion";
import { cn } from "@/lib/utils";
import { RemoveIcon } from "@/lib/icons";

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
  return (
    <Reorder.Item
      value={image}
      id={image.id}
      className={cn(
        "w-full aspect-square rounded-md cursor-grab relative group",
        className
      )}
      {...props}
    >
      <button
        type="button"
        onClick={onDelete}
        className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 opacity-0 scale-90 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto bg-red-500 text-white rounded-md p-1.5 aspect-1"
      >
        <RemoveIcon size={16} />
      </button>
      <Image
        src={image.url}
        alt="community post image"
        width={100}
        height={100}
        className="w-full h-full object-cover rounded-md border-2 pointer-events-none"
      />
    </Reorder.Item>
  );
};

export default ImageThumbnailBox;
