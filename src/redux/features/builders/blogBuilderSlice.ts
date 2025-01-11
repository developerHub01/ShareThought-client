import { defaultGlobalStyles } from "@/constant";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

type editorOrPreviewTypes = "editor" | "preview";
type BlockTypes =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "code"
  | "table"
  | "section";

type TableTypes = "thead" | "tbody" | "tr" | "th" | "td";

export interface BlockInterface {
  postId?: string;
  id: string;
  type: BlockTypes;
  gridSize?: Array<number>;
  text?: string;
  link?: string;
  src?: string;
  alt?: string;
  locationPath: Array<string>;
  children: Array<BlockInterface> | TableInterface;
}

export interface TableInterface {
  thead: Array<Array<string>>;
  tbody: Array<Array<string>>;
}

export interface BlogBuilderState {
  blogs: {
    [id: string]: {
      title: string;
      content: Array<string>;
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
        globalStyles: {
          [key: string]: Record<string, string>;
        };
      };
      editorOrPreview: editorOrPreviewTypes;
      activeBlock: string | null;
      components: {
        [key: string]: BlockInterface;
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
    globalStyles: defaultGlobalStyles,
  },
  editorOrPreview: "editor" as editorOrPreviewTypes,
  activeBlock: null,
  components: {},
};

const tableInitialState: TableInterface = {
  thead: [["Heading 1", "", ""]],
  tbody: [
    ["Data 1", "Data 2", "Data 3"],
    ["Data 4", "Data 5", "Data 6"],
    ["Data 7", "Data 8", "Data 9"],
  ],
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
        type: string;
        gridSize?: Array<number>;
        index: number;
      }>
    ) => {
      const { id: blogId, type, index, gridSize } = action.payload;

      /* if that blog is not exist then create */
      ensureBlogExists(state, blogId);

      const id = uuidv4();

      let block: BlockInterface = {
        id,
        type: "p",
        locationPath: [],
        children: [],
      };

      switch (type) {
        case "h1":
          block = {
            id,
            type,
            text: "heading 1",
            locationPath: [],
            children: [],
          };
          break;
        case "h2":
          block = {
            id,
            type,
            text: "heading 2",
            locationPath: [],
            children: [],
          };
          break;
        case "h3":
          block = {
            id,
            type,
            text: "heading 3",
            locationPath: [],
            children: [],
          };
          break;
        case "h4":
          block = {
            id,
            type,
            text: "heading 4",
            locationPath: [],
            children: [],
          };
          break;
        case "h5":
          block = {
            id,
            type,
            text: "heading 5",
            locationPath: [],
            children: [],
          };
          break;
        case "h6":
          block = {
            id,
            type,
            text: "heading 6",
            locationPath: [],
            children: [],
          };
          break;
        case "p":
          block = {
            id,
            type,
            text: "paragraph",
            locationPath: [],
            children: [],
          };
          break;
        case "section":
          block = {
            id,
            type,
            gridSize,
            locationPath: [],
            children: [],
          };
          break;
        case "table":
          block = {
            id,
            type,
            gridSize,
            locationPath: [],
            children: tableInitialState,
          };
          break;
      }

      state.blogs[blogId].content.push(id);
      state.blogs[blogId].components[id] = block;
    },
    toggleEditorOrPreview: (state, action: PayloadAction<string>) => {
      const activeEditorOrPreview = state.blogs[action.payload].editorOrPreview;

      state.blogs[action.payload].editorOrPreview =
        activeEditorOrPreview === "editor" ? "preview" : "editor";
    },
    removeComponent: (
      state,
      action: PayloadAction<{
        postId: string;
        id: string;
      }>
    ) => {
      const { postId, id } = action.payload;

      delete state.blogs[postId].metaData.styles[id];
      delete state.blogs[postId].metaData.mobileStyles[id];
      delete state.blogs[postId].metaData.hoverStyles[id];
    },
    changeActiveBlock: (
      state,
      action: PayloadAction<{
        blogId: string;
        activeBlockId?: string | null;
      }>
    ) => {
      const { blogId, activeBlockId } = action.payload;
      state.blogs[blogId].activeBlock = activeBlockId || null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  createBlog,
  addComponent,
  updateTitle,
  toggleEditorOrPreview,
  changeActiveBlock,
} = blogBuilderSlice.actions;

export default blogBuilderSlice.reducer;
