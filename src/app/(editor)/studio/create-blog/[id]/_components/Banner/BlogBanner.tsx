"use client";

import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { changeImage } from "@/redux/features/builders/blogBuilderSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import { ImageIcon } from "@/lib/icons";
import React, {
  ChangeEvent,
  DragEvent,
  useCallback,
  useRef,
  useState,
} from "react";
import { selectBlogImgLinkById } from "@/redux/features/builders/selectors";
import Image from "next/image";
import BannerBottomAction from "@/app/(editor)/studio/create-blog/[id]/_components/Banner/BannerBottomAction";

const BlogBanner = () => {
  const { id: blogId } = useParams<{ id: string }>();
  const [isDragging, setIsDragging] = useState(false);
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const bannerImage = useAppSelector((state) =>
    selectBlogImgLinkById(state, blogId, "banner")
  );

  const processImageFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) {
        return toast({
          title: "Oops! That's not an image!",
          description: "Please upload a valid image file",
        });
      }

      const imageURL = URL.createObjectURL(file);

      if (isDragging) setIsDragging(false);

      dispatch(
        changeImage({
          blogId,
          id: "banner",
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
      if (isDragging) setIsDragging(false);
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

  const handleCamera = useCallback(() => {
    imageInputRef.current?.click();
  }, []);

  return (
    <div
      className={cn(
        "w-full max-w-3xl mx-auto aspect-video rounded-md mb-5 text-primary-foreground overflow-hidden relative",
        {
          "shadow-2xl": isDragging,
          "shadow-xl": !isDragging,
        }
      )}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      {bannerImage ? (
        <Image
          width={800}
          height={350}
          alt="banner title"
          src={bannerImage}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex flex-col justify-center items-center relative bg-[url('/images/blog-banner-bg.jpg')] bg-blend-overlay bg-cover bg-no-repeat before:absolute before:content-[''] before:inset-0 before:w-full before:h-full before:pointer-events-none before:z-0 before:bg-primary/80">
          <div className="flex flex-col justify-center items-center gap-4 z-10">
            <ImageIcon size={60} />
            <p>Drop blog banner here...</p>
            <label
              htmlFor="bannerImageUploader"
              className="cursor-pointer bg-primary-foreground hover:bg-primary-foreground/80 text-primary px-4 py-1.5 rounded-sm"
            >
              Upload
            </label>
          </div>
        </div>
      )}

      <input
        type="file"
        name="bannerImageUploader"
        accept="image/*"
        id="bannerImageUploader"
        ref={imageInputRef}
        onChange={handleImageChange}
        hidden
      />

      {bannerImage && <BannerBottomAction handleCamera={handleCamera} />}
    </div>
  );
};

export default BlogBanner;
