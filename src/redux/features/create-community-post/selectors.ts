import { RootState } from "@/redux/store";
import { createSelector } from "@reduxjs/toolkit";
import {
  getCommunityPostImageIndex,
  TPostImages,
} from "@/redux/features/create-community-post/createCommunityPostSlice";

export const selectCommunityPostText = createSelector(
  [(state: RootState) => state.createCommunityPost.text],
  (text) => text.trim() ?? ""
);

export const selectCommunityPostType = createSelector(
  [(state: RootState) => state.createCommunityPost.postType],
  (type) => type ?? "TEXT"
);

export const selectCommunityPostImages = createSelector(
  [
    (state: RootState) => state.createCommunityPost.contextBasedData,
    (state: RootState) => state.createCommunityPost.postType,
  ],
  (contextBasedData, postType) => {
    if (postType !== "IMAGE") return null;

    return contextBasedData as TPostImages;
  }
);

export const selectCommunityPostImageByIndex = createSelector(
  [
    (state: RootState, index: number) =>
      state.createCommunityPost.contextBasedData,
    (state: RootState, index: number) => state.createCommunityPost.postType,
    (state: RootState, index: number) => index,
  ],
  (contextBasedData, postType, index) => {
    if (
      postType !== "IMAGE" ||
      !contextBasedData ||
      index < 0 ||
      index >= contextBasedData.length
    )
      return null;

    return (contextBasedData as TPostImages)[index];
  }
);

export const selectCommunityPostImageById = createSelector(
  [
    (state: RootState, id: string) =>
      state.createCommunityPost.contextBasedData,
    (state: RootState, id: string) => state.createCommunityPost.postType,
    (state: RootState, id: string) => id,
  ],
  (contextBasedData, postType, id) => {
    if (postType !== "IMAGE" || !contextBasedData || !id) return null;

    const images = contextBasedData as TPostImages;
    const index = getCommunityPostImageIndex(images, id);
    if (index < 0) return null;

    return images[index];
  }
);
