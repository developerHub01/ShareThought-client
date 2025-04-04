import React from "react";
import { ImageIcon } from "@/lib/icons";

const BannerCanvas = () => {
  return (
    <CanvasWrapper>
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
    </CanvasWrapper>
  );
};

interface CanvasWrapperProps {
  children: React.ReactNode;
}

const CanvasWrapper = ({ children }: CanvasWrapperProps) => {
  return (
    <div className="p-5 w-full h-full bg-[url('/images/blog-banner-bg.jpg')] bg-blend-overlay bg-cover bg-no-repeat before:absolute before:content-[''] before:inset-0 before:w-full before:h-full before:pointer-events-none before:z-0 before:bg-primary/80">
      <div className="w-full h-full flex flex-col justify-center items-center relative p-5">
        <span className="absolute top-0 left-0 size-8 md:size-14 border-4 md:border-8 rounded-tl-md border-r-transparent border-b-transparent"></span>
        <span className="absolute top-0 right-0 size-8 md:size-14 border-4 md:border-8 rounded-tr-md border-l-transparent border-b-transparent"></span>
        <span className="absolute bottom-0 left-0 size-8 md:size-14 border-4 md:border-8 rounded-bl-md border-r-transparent border-t-transparent"></span>
        <span className="absolute bottom-0 right-0 size-8 md:size-14 border-4 md:border-8 rounded-br-md border-l-transparent border-t-transparent"></span>
        {children}
      </div>
    </div>
  );
};

export default BannerCanvas;
