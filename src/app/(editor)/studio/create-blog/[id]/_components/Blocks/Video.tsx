import { cn } from "@/lib/utils";
import { BlockTypes } from "@/redux/features/builders/blogBuilderSlice";
import React, { CSSProperties } from "react";
import YouTube from "react-youtube";

interface VideoProps {
  type?: BlockTypes;
  id: string;
  styles: CSSProperties;
  videoId: string;
  className?: string;
  [key: string]: unknown;
}

const Video = ({
  type,
  id,
  styles,
  videoId,
  className = "",
  ...props
}: VideoProps) => {
  return (
    <div
      className={cn("flex w-full h-full overflow-hidden", className)}
      data-component-type={type}
      data-component-id={id}
      style={{
        ...styles,
      }}
      {...props}
    >
      <YouTube
        videoId={videoId}
        className="w-full h-full"
        opts={{
          width: "100%",
        }}
      />
    </div>
  );
};

export default Video;
