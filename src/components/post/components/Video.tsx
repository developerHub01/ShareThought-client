import React, { CSSProperties } from "react";
import {
  BlogComponentsDataInterface,
  BlogContentType,
  BlogMetaDataInterface,
} from "@/redux/features/builders/blogBuilderSlice";
import { getYoutubeVideoId } from "@/utils";
import VideoComp from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/Video";

interface VideoProps {
  id: string;
  content: BlogContentType;
  components: BlogComponentsDataInterface;
  metaData: BlogMetaDataInterface;
}

const Video = ({ id, components, metaData }: VideoProps) => {
  if (!components || !components[id]) return null;

  const component = components?.[id];

  const { type = "video", link = "" } = component || {};

  const styles = (metaData?.styles?.[id] || {}) as CSSProperties;

  const videoId = getYoutubeVideoId(link) ?? "";

  return <VideoComp id={id} type={type} videoId={videoId} styles={styles} />;
};

export default Video;
