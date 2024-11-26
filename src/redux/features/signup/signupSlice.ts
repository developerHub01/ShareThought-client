import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface SignUpState {
  avatar: string | null;
}

const initialState: SignUpState = {
  avatar: null,
};

export const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {
    setAvatar: (state, action: PayloadAction<string>) => {
      state.avatar = action.payload;
    },
    removeAvatar: (state) => {
      state.avatar = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAvatar, removeAvatar } = signUpSlice.actions;

export default signUpSlice.reducer;
