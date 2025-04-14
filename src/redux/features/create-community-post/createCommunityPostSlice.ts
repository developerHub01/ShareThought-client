import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TCommunityPostType } from "@/types";
import { COMMUNITY_POST_IMAGE_MAX_COUNT } from "@/constant";

export type TPostImages = Array<string>;

export type TPostShare = string;

export interface CreateCommunityPostState {
  text: string;
  postType: TCommunityPostType;
  contextBasedData?: TPostImages | TPostShare;
}

const initialState: CreateCommunityPostState = {
  text: "",
  postType: "TEXT",
};

const getContextBasedInitialData = (postType: TCommunityPostType) => {
  switch (postType) {
    case "TEXT":
      return;
    case "IMAGE":
      return [] as Array<string>;
    case "POLL":
      return [] as Array<string>;
    case "POLL_WITH_IMAGE":
      return [] as Array<string>;
    case "QUIZ":
      return [] as Array<string>;
    case "POST_SHARE":
      return "";
  }
};

const isImageArray = (data: Array<string>): data is TPostImages => {
  return Array.isArray(data) && data.every((item) => typeof item === "string");
};

export const createCommunityPostSlice = createSlice({
  name: "create-community-post",
  initialState,
  reducers: {
    changeText: (state, action: PayloadAction<string>) => {
      state.text = action.payload.trim();
    },
    changePostType: (state, action: PayloadAction<TCommunityPostType>) => {
      if (state.postType === action.payload) return;

      delete state.contextBasedData;

      state.postType = action.payload;

      state.contextBasedData = getContextBasedInitialData(action.payload);
    },
    changePostImage: (
      state,
      action: PayloadAction<{
        index: number;
        image: string;
      }>
    ) => {
      const { index, image } = action.payload;

      if (
        !image ||
        state.postType !== "IMAGE" ||
        index > COMMUNITY_POST_IMAGE_MAX_COUNT ||
        index > (state.contextBasedData as TPostImages)?.length
      )
        return;

      (state.contextBasedData as TPostImages)[index] = image;
    },
    deletePostImage: (
      state,
      action: PayloadAction<{
        index: number;
      }>
    ) => {
      const { index } = action.payload;

      if (
        state.postType !== "IMAGE" ||
        index > 5 ||
        index > (state.contextBasedData as TPostImages)?.length
      )
        return;

      (state.contextBasedData as TPostImages).splice(index, 1);
    },
    addPostImages: (
      state,
      action: PayloadAction<{
        images: TPostImages;
      }>
    ) => {
      const { images } = action.payload;

      if (state.postType !== "IMAGE" || !isImageArray(images) || !images.length)
        return;

      const existingImageList = state.contextBasedData as TPostImages;

      const needToAcceptImageNumber =
        COMMUNITY_POST_IMAGE_MAX_COUNT - (existingImageList?.length ?? 0);

      if (!needToAcceptImageNumber) return;

      (state.contextBasedData as TPostImages) = [
        ...existingImageList,
        ...images.slice(0, needToAcceptImageNumber),
      ];
    },
  },
});

export const {
  changeText,
  changePostType,
  changePostImage,
  deletePostImage,
  addPostImages,
} = createCommunityPostSlice.actions;

export default createCommunityPostSlice.reducer;
