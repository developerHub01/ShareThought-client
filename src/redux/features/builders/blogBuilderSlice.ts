import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

interface BlockInterface {
  id: string;
  type: string;
  text?: string;
  link?: string;
  src?: string;
  alt?: string;
  locationPath: Array<string>;
  children: Array<BlockInterface>;
}

export interface BlogBuilderState {
  blogs: {
    [id: string]: {
      title: string;
      content: Array<BlockInterface>;
      metaData: {
        imgLinks: Record<string, string>;
        styles: {
          [key: string]: Record<string, string>;
        };
        mobileStyles: {
          [key: string]: Record<string, string>;
        };
        hoverStyles: {
          [key: string]: Record<string, string>;
        };
      };
    };
  };
}

const blogInitialState = {
  title: "",
  content: [],
  metaData: {
    imgLinks: {} as Record<string, string>,
    styles: {} as Record<string, Record<string, string>>,
    mobileStyles: {} as Record<string, Record<string, string>>,
    hoverStyles: {} as Record<string, Record<string, string>>,
  },
};

const initialState: BlogBuilderState = {
  blogs: {},
};

const ensureBlogExists = (state: BlogBuilderState, id: string) => {
  if (!state.blogs[id]) {
    state.blogs[id] = { ...blogInitialState };
  }
};

export const blogBuilderSlice = createSlice({
  name: "blogBuilder",
  initialState,
  reducers: {
    createBlog: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.blogs[id] = { ...blogInitialState };
    },
    updateTitle: (
      state,
      action: PayloadAction<{
        id: string;
        title: string;
      }>
    ) => {
      const { id, title } = action.payload;

      /* if that blog is not exist then create */
      ensureBlogExists(state, id);

      state.blogs[id].title = title;
    },
    addComponent: (
      state,
      action: PayloadAction<{
        id: string;
        blockId: string;
        index: number;
      }>
    ) => {
      const { id, blockId, index } = action.payload;
      console.log({ id, blockId, index });

      /* if that blog is not exist then create */
      ensureBlogExists(state, id);

      let block: BlockInterface = {
        id: uuidv4(),
        type: "p",
        locationPath: [],
        children: [],
      };

      switch (blockId) {
        case "h1":
          block = {
            id: uuidv4(),
            type: blockId,
            locationPath: [],
            children: [],
          };
          break;
      }

      state.blogs[id].content.push(block);
    },
  },
});

// Action creators are generated for each case reducer function
export const { createBlog, addComponent, updateTitle } =
  blogBuilderSlice.actions;

export default blogBuilderSlice.reducer;
