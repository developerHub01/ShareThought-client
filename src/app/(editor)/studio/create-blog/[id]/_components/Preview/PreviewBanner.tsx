import Image from "next/image";
import React from "react";

interface PreviewBannerProps {
  banner: string;
}
const PreviewBanner = ({ banner }: PreviewBannerProps) => {
  return (
    <>
      {banner && (
        <div className="w-full aspect-video rounded-sm overflow-hidden mb-4 shadow-xl">
          <Image
            width={800}
            height={350}
            alt="banner title"
            src={banner}
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </>
  );
};

export default PreviewBanner;
