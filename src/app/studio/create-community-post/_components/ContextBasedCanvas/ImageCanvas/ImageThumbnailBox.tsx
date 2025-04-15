"use client";

import React from "react";
import Image from "next/image";
import { Reorder } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { RemoveIcon } from "@/lib/icons";

interface ImageThumbnailBoxProps {
  url: string;
  onDelete: () => void;
  className?: string;
  [key: string]: unknown;
}

const ImageThumbnailBox = ({
  url,
  className,
  onDelete,
  ...props
}: ImageThumbnailBoxProps) => {
  return (
    <Reorder.Item
      key={url}
      value={url}
      id={url}
      className={cn(
        "w-full aspect-square rounded-md cursor-grab relative group",
        className
      )}
      {...props}
    >
      <Button
        variant={"destructive"}
        size={"smIcon"}
        onClick={onDelete}
        className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 opacity-0 scale-90 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto"
      >
        <RemoveIcon size={16} />
      </Button>
      <Image
        src={url}
        alt="community post image"
        width={100}
        height={100}
        className="w-full h-full object-cover rounded-md border-2 pointer-events-none"
      />
    </Reorder.Item>
  );
};

export default ImageThumbnailBox;
