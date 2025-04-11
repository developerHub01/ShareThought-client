"use client";

import React, { memo, useMemo } from "react";
import { useParams } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { selectBlogComponentById } from "@/redux/features/builders/selectors";
import VideoUploadCanvas from "@/app/(editor)/studio/create-blog/[id]/_components/Components/VideoUploadCanvas";
import YouTube from "react-youtube";
import { getYoutubeVideoId } from "@/utils";

interface VideoProps {
  id: string;
  parentId?: string;
  [key: string]: unknown;
}

const Video = memo(({ id, parentId, ...props }: VideoProps) => {
  const { id: blogId } = useParams<{ id: string }>();

  const component = useAppSelector((state) =>
    selectBlogComponentById(state, blogId, id)
  );

  const { type, link = "" } = component || {};

  const videoId = useMemo(() => getYoutubeVideoId(link) ?? "", [link]);

  if (!blogId || !component) return null;

  if (!link) return <VideoUploadCanvas />;

  return (
    <div
      className="flex w-full h-full overflow-hidden"
      data-component-type={type}
      data-component-id={id}
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
});

export default Video;
