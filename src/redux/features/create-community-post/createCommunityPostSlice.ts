import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TCommunityPostType } from "@/types";

export interface createCommunityPostState {
  text: string;
  postType: TCommunityPostType;
}

const initialState: createCommunityPostState = {
  text: "",
  postType: "TEXT",
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
      state.postType = action.payload;
    },
  },
});

export const { changeText, changePostType } = createCommunityPostSlice.actions;

export default createCommunityPostSlice.reducer;
