"use client";

import React, { CSSProperties, memo, useMemo } from "react";
import { useParams } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import {
  selectBlogComponentById,
  selectBlogMobileStylesById,
  selectBlogStylesById,
} from "@/redux/features/builders/selectors";
import VideoUploadCanvas from "@/app/(editor)/studio/create-blog/[id]/_components/Components/VideoUploadCanvas";
import { getYoutubeVideoId } from "@/utils";
import useCombinedResponsiveSettingStyles from "@/hooks/editor/use-combined-responsive-setting-styles";
import { useEditorPreview } from "@/app/(editor)/studio/create-blog/[id]/_context/Preview/EditorPreviewProvider";
import VideoComp from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/Video";

interface VideoProps {
  id: string;
  parentId?: string;
  [key: string]: unknown;
}

const Video = memo(({ id, parentId, ...props }: VideoProps) => {
  const { id: blogId } = useParams<{ id: string }>();

  const { screenType } = useEditorPreview();
  const component = useAppSelector((state) =>
    selectBlogComponentById(state, blogId, id)
  );
  const styles = useAppSelector((state) =>
    selectBlogStylesById(state, blogId, id)
  );
  const mobileStyles = useAppSelector((state) =>
    selectBlogMobileStylesById(state, blogId, id)
  );

  const { type = "video", link = "" } = component || {};

  const videoId = useMemo(() => getYoutubeVideoId(link) ?? "", [link]);

  const combinedStyles = useCombinedResponsiveSettingStyles({
    type,
    screenType,
    styles,
    mobileStyles,
  }) as CSSProperties;

  if (!blogId || !component) return null;

  if (!link) return <VideoUploadCanvas />;

  return (
    <VideoComp id={id} type={type} videoId={videoId} styles={combinedStyles} />
  );
});

export default Video;
