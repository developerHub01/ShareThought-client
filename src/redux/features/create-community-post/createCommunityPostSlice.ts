import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TCommunityPostType } from "@/types";
import { COMMUNITY_POST_IMAGE_MAX_COUNT } from "@/constant";
import { v4 as uuidv4 } from "uuid";

export interface PostImage {
  id: string;
  url: string;
}

export type TPostImages = Array<PostImage>;

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

const imageIndex = (images: TPostImages, id: string) =>
  images.findIndex((item) => item.id === id);

export const createCommunityPostSlice = createSlice({
  name: "create-community-post",
  initialState,
  reducers: {
    changeText: (
      state,
      action: PayloadAction<{
        text: string;
      }>
    ) => {
      const { text } = action.payload;

      state.text = text.trim();
    },
    changePostType: (
      state,
      action: PayloadAction<{
        type: TCommunityPostType;
      }>
    ) => {
      const { type } = action.payload;

      if (state.postType === type) return;

      delete state.contextBasedData;

      state.postType = type;

      switch (type) {
        case "TEXT":
          break;
        case "IMAGE":
          state.contextBasedData = [];
          break;
        case "POLL":
          state.contextBasedData = [];
          break;
        case "POLL_WITH_IMAGE":
          state.contextBasedData = [];
          break;
        case "QUIZ":
          state.contextBasedData = [];
          break;
        case "POST_SHARE":
          state.contextBasedData = "";
          break;
      }
    },
    changePostImage: (
      state,
      action: PayloadAction<{
        id: string;
        image: string;
      }>
    ) => {
      const { id, image } = action.payload;

      if (!image || state.postType !== "IMAGE") return;

      const index = imageIndex(state.contextBasedData as TPostImages, id);
      if (index < 0) return;

      (state.contextBasedData as TPostImages)[index].url = image;
    },
    deletePostImage: (
      state,
      action: PayloadAction<{
        id: string;
      }>
    ) => {
      const { id } = action.payload;

      if (state.postType !== "IMAGE") return;

      const postImages = state.contextBasedData as TPostImages;
      const index = imageIndex(postImages, id);
      if (index < 0 || index > postImages?.length) return;

      (state.contextBasedData as TPostImages).splice(index, 1);
    },
    addPostImages: (
      state,
      action: PayloadAction<{
        images: Array<string>;
      }>
    ) => {
      const { images } = action.payload;

      if (state.postType !== "IMAGE") return;

      const existingImageList = state.contextBasedData as TPostImages;

      const needToAcceptImageNumber =
        COMMUNITY_POST_IMAGE_MAX_COUNT - (existingImageList?.length ?? 0);

      if (!needToAcceptImageNumber) return;

      const imagesNeedToAdd = images
        ?.slice(0, needToAcceptImageNumber)
        ?.reduce((acc, curr) => {
          acc.push({
            id: uuidv4(),
            url: curr,
          });
          return acc;
        }, [] as TPostImages);

      (state.contextBasedData as TPostImages) = [
        ...existingImageList,
        ...imagesNeedToAdd,
      ];
    },
    replaceAllPostImages: (
      state,
      action: PayloadAction<{
        images: TPostImages;
      }>
    ) => {
      const { images } = action.payload;

      if (state.postType !== "IMAGE") return;

      (state.contextBasedData as TPostImages) = [...images];
    },
  },
});

export const {
  changeText,
  changePostType,
  changePostImage,
  deletePostImage,
  addPostImages,
  replaceAllPostImages,
} = createCommunityPostSlice.actions;

export default createCommunityPostSlice.reducer;
