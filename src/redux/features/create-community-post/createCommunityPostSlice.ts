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
export interface PostPollQuizOptionInterface {
  id: string;
  text: string;
  image?: string;
  isCorrectAnswer?: boolean;
  correctAnswerExplaination?: string;
}
export interface PostPollQuizInterface {
  options: Array<PostPollQuizOptionInterface>;
}
export interface CreateCommunityPostState {
  text: string;
  postType: TCommunityPostType;
  postImageDetails?: PostImagesInterface;
  postSharedPostDetails?: PostShareInterface;
  postPollDetails?: PostPollQuizInterface;
  postPollWithImageDetails?: PostPollQuizInterface;
  postQuizDetails?: PostPollQuizInterface;
}

const initialState: CreateCommunityPostState = {
  text: "",
  postType: "TEXT",
};

const generatePollOption = (
  type: "TEXT_POLL" | "IMAGE_POLL" | "QUIZ"
): PostPollQuizOptionInterface => {
  return {
    id: uuidv4(),
    text: "Option",
    ...(type === "IMAGE_POLL"
      ? {
          image: "",
        }
      : {}),
  };
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
          state.postPollDetails = {
            options: [
              generatePollOption("TEXT_POLL"),
              generatePollOption("TEXT_POLL"),
            ],
          };
          break;
        case "POLL_WITH_IMAGE":
          state.postPollWithImageDetails = {
            options: [
              generatePollOption("IMAGE_POLL"),
              generatePollOption("IMAGE_POLL"),
            ],
          };
          break;
        case "QUIZ":
          state.postQuizDetails = state.postQuizDetails = {
            options: [generatePollOption("QUIZ"), generatePollOption("QUIZ")],
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
    addPollQuizOption: (state) => {
      const isTextPoll = state.postType === "POLL";
      const isImagePoll = state.postType === "POLL_WITH_IMAGE";
      const isQuiz = state.postType === "QUIZ";

      const pollOptions = isTextPoll
        ? state.postPollDetails?.options
        : isImagePoll
        ? state.postPollWithImageDetails?.options
        : state.postQuizDetails?.options;

      if ((isTextPoll || isImagePoll || isQuiz) && pollOptions) {
        const newOption = generatePollOption(
          isTextPoll ? "TEXT_POLL" : isImagePoll ? "IMAGE_POLL" : "QUIZ"
        );
        pollOptions.push(newOption);
      }
    },
    deletePollQuizOption: (
      state,
      action: PayloadAction<{
        id: string;
      }>
    ) => {
      const { id } = action.payload;

      const isTextPoll = state.postType === "POLL";
      const isImagePoll = state.postType === "POLL_WITH_IMAGE";
      const isQuiz = state.postType === "QUIZ";

      const pollOptions = isTextPoll
        ? state.postPollDetails?.options
        : isImagePoll
        ? state.postPollWithImageDetails?.options
        : state.postQuizDetails?.options;

      if ((pollOptions?.length ?? 0) <= 1) {
        delete state.postImageDetails;
        delete state.postPollDetails;
        delete state.postPollWithImageDetails;
        delete state.postQuizDetails;
        delete state.postSharedPostDetails;
        state.postType = "TEXT";

        return;
      }

      if ((isTextPoll || isImagePoll || isQuiz) && pollOptions) {
        const index = pollOptions.findIndex((option) => option.id === id);

        if (index < 0) return;

        pollOptions.splice(index, 1);
      }
    },
    changePollQuizOption: (
      state,
      action: PayloadAction<{
        id: string;
        text?: string;
        image?: string;
        isCorrectAnswer?: boolean;
        correctAnswerExplaination?: string;
      }>
    ) => {
      const { id, isCorrectAnswer, correctAnswerExplaination } = action.payload;
      console.log(action.payload);
      const isTextPoll = state.postType === "POLL";
      const isImagePoll = state.postType === "POLL_WITH_IMAGE";
      const isQuiz = state.postType === "QUIZ";

      console.log(action.payload);

      /* if type is QUIZ and try to update correct ans  */
      if (isCorrectAnswer && state.postQuizDetails?.options) {
        state.postQuizDetails.options = state.postQuizDetails.options.map(
          (option) => {
            if (option.id === id) option.isCorrectAnswer = true;
            else {
              delete option.isCorrectAnswer;
              delete option.correctAnswerExplaination;
            }
            return option;
          }
        );
      }

      if (correctAnswerExplaination && state.postQuizDetails?.options) {
        state.postQuizDetails.options = state.postQuizDetails.options.map(
          (option) => {
            if (option.id === id)
              option.correctAnswerExplaination = correctAnswerExplaination;

            return option;
          }
        );
      }

      const pollOptions = isTextPoll
        ? state.postPollDetails?.options
        : isImagePoll
        ? state.postPollWithImageDetails?.options
        : state.postQuizDetails?.options;

      if ((isTextPoll || isImagePoll || isQuiz) && pollOptions) {
        const index = pollOptions.findIndex((option) => option.id === id);

        if (index < 0) return;

        pollOptions[index] = {
          ...pollOptions[index],
          ...action.payload,
        };
      }
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
  addPollQuizOption,
  deletePollQuizOption,
  changePollQuizOption,
} = createCommunityPostSlice.actions;

export default createCommunityPostSlice.reducer;
