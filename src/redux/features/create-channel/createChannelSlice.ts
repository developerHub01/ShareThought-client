import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CreateChannelState {
  channelState: {
    channelName: string;
    channelDescription: string | null;
    channelAvatar: string | null;
    channelCover: string | null;
  };
  imageSaveRequest: boolean;
}

const initialState: CreateChannelState = {
  channelState: {
    channelName: "",
    channelDescription: "",
    channelAvatar: "",
    channelCover: "",
  },
  imageSaveRequest: false,
};

interface SetFieldPayload {
  key: "channelName" | "channelDescription" | "channelAvatar" | "channelCover";
  value: string;
}

type RemoveFieldPayload =
  | "channelDescription"
  | "channelAvatar"
  | "channelCover";

export const createChannelSlice = createSlice({
  name: "create-channel",
  initialState,
  reducers: {
    setField: (state, action: PayloadAction<SetFieldPayload>) => {
      const { key, value } = action.payload;
      state.channelState[key] = value;
    },
    removeField: (state, action: PayloadAction<RemoveFieldPayload>) => {
      state.channelState[action.payload] = null;
    },
    clearState: (state) => initialState,
    imageRequestSave: (state) => {
      state.imageSaveRequest = true;
    },
    clearSaveImageRequest: (state) => {
      state.imageSaveRequest = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setField,
  removeField,
  clearState,
  imageRequestSave,
  clearSaveImageRequest,
} = createChannelSlice.actions;

export default createChannelSlice.reducer;
