import React from "react";
import {
  BlogComponentsDataInterface,
  BlogContentType,
  BlogMetaDataInterface,
} from "@/redux/features/builders/blogBuilderSlice";
import { getYoutubeVideoId } from "@/utils";
import YouTube from "react-youtube";

interface VideoProps {
  id: string;
  content: BlogContentType;
  components: BlogComponentsDataInterface;
  metaData: BlogMetaDataInterface;
}

const Video = ({ id, components }: VideoProps) => {
  if (!components || !components[id]) return null;

  const component = components?.[id];

  const { type, link = "" } = component || {};

  const videoId = getYoutubeVideoId(link) ?? "";

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
};

export default Video;
