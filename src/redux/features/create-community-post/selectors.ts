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
