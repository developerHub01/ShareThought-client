"use client";

import { useToast } from "@/hooks/use-toast";
import { useAppDispatch } from "@/redux/hooks";
import { Image as ImageIcon } from "lucide-react";
import React, {
  ChangeEvent,
  DragEvent,
  useCallback,
  useRef,
  useState,
} from "react";
import { changeImage } from "@/redux/features/builders/blogBuilderSlice";
import { cn } from "@/lib/utils";

interface ImageUploadCanvasProps {
  id: string;
  blogId: string;
}

const ImageUploadCanvas = ({ id, blogId }: ImageUploadCanvasProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const processImageFile = useCallback(
    (file: File) => {
      console.log(file);

      if (!file.type.startsWith("image/")) {
        return toast({
          title: "Oops! That's not an image!",
          description:
            "Please upload a valid image file to set your avatar. 😊",
        });
      }

      const imageURL = URL.createObjectURL(file);

      console.log({ imageURL });

      dispatch(
        changeImage({
          blogId,
          id,
          image: imageURL,
        })
      );
    },
    [dispatch, toast]
  );

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const image = e.dataTransfer.files[0];
      if (image) processImageFile(image);
    },
    [processImageFile]
  );

  const handleDragOver = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (!isDragging) setIsDragging(true);
    },
    [isDragging]
  );

  const handleDragLeave = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (isDragging) setIsDragging(false);
    },
    [isDragging]
  );

  const handleImageChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const image = e.target.files?.[0];
      if (image) processImageFile(image);
    },
    [processImageFile]
  );

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={cn(
        "p-5 flex justify-center items-center flex-col gap-2 select-none border-2 border-dashed rounded-md",
        {
          "ring-primary/50 bg-accent border-primary/50": isDragging,
          "ring-transparent bg-accent/10 border-transparent": !isDragging,
        }
      )}
    >
      <ImageIcon size={50} />
      <p>Drop your image here...</p>

      <input
        type="file"
        name="imageUploader"
        accept="image/*"
        id="imageUploader"
        ref={imageInputRef}
        onChange={handleImageChange}
        hidden
      />
      <label
        htmlFor="imageUploader"
        className="cursor-pointer bg-primary hover:bg-primary/80 text-primary-foreground px-4 py-1.5 rounded-sm"
      >
        Upload
      </label>
    </div>
  );
};

export default ImageUploadCanvas;
