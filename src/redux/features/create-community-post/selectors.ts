import { RootState } from "@/redux/store";
import { createSelector } from "@reduxjs/toolkit";

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
    (state: RootState) => state.createCommunityPost.postImageDetails?.images,
    (state: RootState) => state.createCommunityPost.postType,
  ],
  (images, postType) => {
    if (postType !== "IMAGE") return null;

    return images;
  }
);

export const selectCommunityPostImageByIndex = createSelector(
  [
    (state: RootState, index: number) =>
      state.createCommunityPost.postImageDetails?.images,
    (state: RootState, index: number) => state.createCommunityPost.postType,
    (state: RootState, index: number) => index,
  ],
  (images, postType, index) => {
    if (postType !== "IMAGE" || !images || index < 0 || index >= images.length)
      return null;

    return images[index];
  }
);

export const selectCommunityPostImageById = createSelector(
  [
    (state: RootState, id: string) =>
      state.createCommunityPost.postImageDetails?.images,
    (state: RootState, id: string) => state.createCommunityPost.postType,
    (state: RootState, id: string) => id,
  ],
  (images, postType, id) => {
    if (postType !== "IMAGE" || !images || !id) return null;

    return images.find((image) => image.id === id);
  }
);

export const selectCommunityPostPoll = createSelector(
  [
    (state: RootState) =>
      state.createCommunityPost.postPollDetails?.options ??
      state.createCommunityPost.postPollWithImageDetails?.options,
    (state: RootState) => state.createCommunityPost.postType,
  ],
  (options, postType) => {
    if (
      (postType !== "POLL" && postType !== "POLL_WITH_IMAGE") ||
      !Array.isArray(options)
    )
      return null;

    return options;
  }
);

export const selectCommunityPostPollOption = createSelector(
  [
    (state: RootState, id: string) =>
      state.createCommunityPost.postPollDetails?.options ??
      state.createCommunityPost.postPollWithImageDetails?.options,
    (state: RootState, id: string) => state.createCommunityPost.postType,
    (state: RootState, id: string) => id,
  ],
  (options, postType, id) => {
    if (
      (postType !== "POLL" && postType !== "POLL_WITH_IMAGE") ||
      !Array.isArray(options)
    )
      return null;

    return options.find((option) => option.id === id);
  }
);
