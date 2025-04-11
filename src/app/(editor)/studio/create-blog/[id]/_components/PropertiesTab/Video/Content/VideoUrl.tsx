"use client";

import React, { useState, memo, useEffect, useCallback } from "react";
import InputWithAttachLebel from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/InputWithAttachLebel";
import { changeLink } from "@/redux/features/builders/blogBuilderSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { isValidYoutubeVideoURL } from "@/utils/index";
import PropertyWrapper_v1 from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/PropertyWrapper_v1";
import {
  selectBlogActiveBlock,
  selectBlogComponentById,
} from "@/redux/features/builders/selectors";
import { useParams } from "next/navigation";

const VideoUrl = memo(() => {
  const { id: blogId } = useParams<{ id: string }>();

  const [url, setUrl] = useState("");
  const dispatch = useAppDispatch();

  const activeBlock = useAppSelector((state) =>
    selectBlogActiveBlock(state, blogId)
  );
  const activeComponent = useAppSelector((state) =>
    selectBlogComponentById(state, blogId, activeBlock)
  );

  useEffect(() => {
    if (activeBlock && !activeComponent?.link) setUrl("");
  }, [activeBlock, activeComponent]);

  if (!blogId || !activeBlock || !activeComponent) return null;

  const handleChange = (value: string) => setUrl(value.trim());

  const handleBlur = useCallback(
    (link: string) => {
      if (!link) return;

      if (!isValidYoutubeVideoURL(link)) return setUrl("");

      dispatch(
        changeLink({
          blogId,
          id: activeBlock,
          link,
        })
      );
    },
    [dispatch, blogId, activeBlock]
  );

  return (
    <PropertyWrapper_v1>
      <InputWithAttachLebel
        label="Url"
        placeholder="Add YouTube link"
        value={url}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </PropertyWrapper_v1>
  );
});

export default VideoUrl;
