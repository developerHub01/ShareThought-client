import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TCommunityPostType } from "@/types";
import { COMMUNITY_POST_IMAGE_MAX_COUNT } from "@/constant";
import { v4 as uuidv4 } from "uuid";

export interface PostImage {
  id: string;
  url: string;
}

export interface PostImageInterface {
  id: string;
  url: string;
}

export interface PostImagesInterface {
  images: Array<PostImageInterface>;
}

export interface PostShareInterface {
  postId: string;
}

export interface PostTextPollOptionInterface {
  id: string;
  text: string;
}
export interface PostImagePollOptionInterface
  extends PostTextPollOptionInterface {
  image: string;
}
export interface PostPollDetailsInterface {
  options: Array<PostTextPollOptionInterface>;
}
export interface PostPollWithImageDetailsInterface {
  options: Array<PostImagePollOptionInterface>;
}
export interface PostQuizDetailsInterface {}

export interface CreateCommunityPostState {
  text: string;
  postType: TCommunityPostType;
  postImageDetails?: PostImagesInterface;
  postSharedPostDetails?: PostShareInterface;
  postPollDetails?: PostPollDetailsInterface;
  postPollWithImageDetails?: PostPollWithImageDetailsInterface;
  postQuizDetails?: PostQuizDetailsInterface;
}

const initialState: CreateCommunityPostState = {
  text: "",
  postType: "TEXT",
};

const initialPostPollDetails: PostPollDetailsInterface = {
  options: [
    {
      id: uuidv4(),
      text: "Option 1",
    },
    {
      id: uuidv4(),
      text: "Option 2",
    },
  ],
};

const initialPostPollWithImageDetails: PostPollWithImageDetailsInterface = {
  options: [
    {
      id: uuidv4(),
      text: "Option 1",
      image: "",
    },
    {
      id: uuidv4(),
      text: "Option 2",
      image: "",
    },
  ],
};

export const getCommunityPostImageIndex = (
  images: Array<PostImageInterface>,
  id: string
) => images.findIndex((item) => item.id === id);

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

      delete state.postImageDetails;
      delete state.postPollDetails;
      delete state.postPollWithImageDetails;
      delete state.postQuizDetails;
      delete state.postSharedPostDetails;

      state.postType = type;

      switch (type) {
        case "TEXT":
          break;
        case "IMAGE":
          state.postImageDetails = {
            images: [],
          };
          break;
        case "POLL":
          state.postPollDetails = initialPostPollDetails;
          break;
        case "POLL_WITH_IMAGE":
          state.postPollWithImageDetails = state.postPollDetails =
            initialPostPollWithImageDetails;
          break;
        case "QUIZ":
          state.postQuizDetails = state.postPollDetails = {
            options: [],
          };
          break;
        case "POST_SHARE":
          state.postSharedPostDetails = {
            postId: "",
          };
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

      if (
        !image ||
        state.postType !== "IMAGE" ||
        !state.postImageDetails?.images
      )
        return;

      const index = getCommunityPostImageIndex(
        state.postImageDetails?.images,
        id
      );

      if (index < 0) return;

      state.postImageDetails.images[index].url = image;
    },
    deletePostImage: (
      state,
      action: PayloadAction<{
        id: string;
      }>
    ) => {
      const { id } = action.payload;

      if (state.postType !== "IMAGE" || !state.postImageDetails?.images) return;

      const postImages = state.postImageDetails.images;

      const index = getCommunityPostImageIndex(postImages, id);
      if (index < 0 || index > postImages?.length) return;

      state.postImageDetails.images.splice(index, 1);
    },
    addPostImages: (
      state,
      action: PayloadAction<{
        images: Array<string>;
      }>
    ) => {
      const { images } = action.payload;

      if (state.postType !== "IMAGE" || !state.postImageDetails?.images) return;

      const existingImageList = state.postImageDetails.images;

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
        }, [] as Array<PostImageInterface>);

      state.postImageDetails.images = [
        ...existingImageList,
        ...imagesNeedToAdd,
      ];
    },
    replaceAllPostImages: (
      state,
      action: PayloadAction<{
        images: Array<PostImageInterface>;
      }>
    ) => {
      const { images } = action.payload;

      if (state.postType !== "IMAGE" || !state.postImageDetails?.images) return;

      state.postImageDetails.images = [...images];
    },
    addSharePostId: (
      state,
      action: PayloadAction<{
        postId: string;
      }>
    ) => {
      const { postId } = action.payload;

      if (state.postType !== "POST_SHARE") return;

      state.postSharedPostDetails = {
        postId,
      };
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
  addSharePostId,
} = createCommunityPostSlice.actions;

export default createCommunityPostSlice.reducer;
