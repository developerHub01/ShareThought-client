"use client";

import { useCallback } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { processFiles } from "@/utils";
import { COMMUNITY_POST_IMAGE_MAX_COUNT } from "@/constant";
import { useToast } from "../use-toast";
import { addPostImages } from "@/redux/features/create-community-post/createCommunityPostSlice";

const useUploadCommunityPostImage = () => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const processImageFiles = useCallback((files: FileList) => {
    const imageList = processFiles({
      files,
      type: "image/",
      limit: COMMUNITY_POST_IMAGE_MAX_COUNT,
    });

    if (!imageList)
      return toast({
        title: "Oops! That's not image!",
        description: "Please upload valid image files. 😊",
      });

    dispatch(
      addPostImages({
        images: imageList,
      })
    );
  }, []);
  return processImageFiles;
};

export default useUploadCommunityPostImage;
