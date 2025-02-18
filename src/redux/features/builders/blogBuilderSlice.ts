import { defaultGlobalStyles, EDITOR_TABLE_SIZE } from "@/constant";
import { isValidHexColor, isValidURL } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

type editorOrPreviewTypes = "editor" | "preview";
export type BlockTypes =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "button"
  | "code"
  | "table"
  | "row"
  | "column"
  | "image"
  | "spacer"
  | "divider"
  | "accordion"
  | "collapse"
  | "list"
  | "blockquote";

export type TypographyType = Extract<
  BlockTypes,
  "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p"
>;

type TableTypes = "thead" | "tbody" | "tr" | "th" | "td";
export type BorderStyleType = "solid" | "dotted" | "dashed";
export type StripedType = "even" | "odd";
export type AlignType = "left" | "center" | "right" | "justify";
export type flexAlignType =
  | "flex-start"
  | "center"
  | "flex-end"
  | "flex-between";
export type FontWeightType = "bold" | "normal";
export type LineHeightType = 1.2 | 1.5 | 1.8 | 2.0;
export type TextDirectionType = "ltr" | "rtl";
export type TextTransformType =
  | "none"
  | "capitalize"
  | "uppercase"
  | "lowercase";
export type PaddingType =
  | "padding"
  | "paddingTop"
  | "paddingBottom"
  | "paddingLeft"
  | "paddingRight";

export type BorderRadiusType =
  | "borderRadius"
  | "borderTopLeftRadius"
  | "borderTopRightRadius"
  | "borderBottomLeftRadius"
  | "borderBottomRightRadius";

export type BorderType =
  | "border"
  | "borderTop"
  | "borderBottom"
  | "borderLeft"
  | "borderRight";

export type FilterType = {
  brightness?: number;
  contrast?: number;
  grayscale?: number;
  sepia?: number;
  "hue-rotate"?: number;
  saturate?: number;
  blur?: number;
  invert?: number;
  opacity?: number;
  "drop-shadow"?: [number, number, number, string];
};

export interface BlockInterface {
  postId?: string;
  id: string;
  type: BlockTypes;
  gridSize?: Array<number>;
  text?: string;
  link?: string;
  redirect?: string; // if any component is linked with web.
  alt?: string;
  caption?: string;
  locationPath?: Array<string>;
  children?: Array<string> | TableInterface | AccordionInterface;
}

export interface StripedRowInterface {
  backgroundColor?: string;
  stripedType?: StripedType;
}

export interface TableHeaderInterface {
  backgroundColor?: string;
  textColor?: string;
  fontSize?: number;
  fontWeight?: FontWeightType;
  align?: AlignType;
}

export interface TableContentInterface {
  textColor?: string;
  fontSize?: number;
  fontWeight?: FontWeightType;
  letterSpacing?: number;
  lineHeight?: LineHeightType;
  align?: AlignType;
  textDirection?: TextDirectionType;
}

export interface TableInterface {
  thead: Array<Array<string>>;
  tbody: Array<Array<string>>;
  border?: {
    style?: BorderStyleType;
    color?: string;
    size?: number;
  };
  backgroundColor?: string;
  textColor?: string;
  stripedRow?: StripedRowInterface;
  header?: TableHeaderInterface;
  content?: TableContentInterface;
}

export interface AccordionInterface {
  data: Array<{
    id: string;
    title: string;
    content: string;
  }>;
  styles: {
    container: Record<string, string | number>;
    body: Record<string, string | number>;
    title: Record<string, string | number>;
    content: Record<string, string | number>;
  };
}

export interface BorderInterface {
  border?: [number, string, string];
  borderTop?: [number, string, string];
  borderBottom?: [number, string, string];
  borderLeft?: [number, string, string];
  borderRight?: [number, string, string];
}

export type StyleType = Record<
  string,
  string | number | Array<string | number>
> &
  BorderInterface & {
    filter?: FilterType;
  };

export interface StylesInterface {
  [key: string]: StyleType;
}

export interface BlogMetaDataInterface {
  imgLinks: Record<string, string>;
  styles: StylesInterface;
  mobileStyles: {
    [key: string]: Record<string, string | number>;
  };
  hoverStyles: {
    [key: string]: Record<string, string | number>;
  };
  globalStyles: {
    [key: string]: Record<string, string | number>;
  };
}

export interface BlogComponentsDataInterface {
  [key: string]: BlockInterface;
}

export type BlogContentType = Array<string>;

export interface BlogStateInterface {
  title: string;
  content: BlogContentType;
  metaData: BlogMetaDataInterface;
  components: BlogComponentsDataInterface;
}

export interface BlogBuilderState {
  blogs: {
    [id: string]: BlogStateInterface & {
      editorOrPreview: editorOrPreviewTypes;
      activeBlock: string | null;
    };
  };
  isImageEditorOpen: boolean;
  hoveringComponentId?: string | null;
}

const blogInitialState = {
  title: "",
  content: [],
  metaData: {
    imgLinks: {} as Record<string, string>,
    styles: {} as StylesInterface,
    mobileStyles: {} as Record<string, Record<string, string | number>>,
    hoverStyles: {} as Record<string, Record<string, string | number>>,
    globalStyles: defaultGlobalStyles,
  },
  editorOrPreview: "editor" as editorOrPreviewTypes,
  activeBlock: null,
  components: {},
  hoveringComponentId: null,
};

const tableHeaderInitialState: TableHeaderInterface = {
  backgroundColor: EDITOR_TABLE_SIZE.DEFAULT_HEADER_BACKGROUND_COLOR,
  textColor: EDITOR_TABLE_SIZE.DEFAULT_HEADER_TEXT_COLOR,
  fontSize: EDITOR_TABLE_SIZE.DEFAULT_HEADER_FONT_SIZE,
  fontWeight: EDITOR_TABLE_SIZE.DEFAULT_HEADER_FONT_WEIGHT as FontWeightType,
  align: EDITOR_TABLE_SIZE.DEFAULT_ALIGN as AlignType,
};

const tableContentInitialState: TableContentInterface = {
  textColor: EDITOR_TABLE_SIZE.DEFAULT_CONTENT_TEXT_COLOR,
  fontSize: EDITOR_TABLE_SIZE.DEFAULT_CONTENT_FONT_SIZE,
  fontWeight: EDITOR_TABLE_SIZE.DEFAULT_CONTENT_FONT_WEIGHT as FontWeightType,
  letterSpacing: EDITOR_TABLE_SIZE.DEFAULT_CONTENT_LETTER_SPACING,
  lineHeight: EDITOR_TABLE_SIZE.DEFAULT_CONTENT_LINE_HEIGHT as LineHeightType,
  align: EDITOR_TABLE_SIZE.DEFAULT_ALIGN as AlignType,
  textDirection:
    EDITOR_TABLE_SIZE.DEFAULT_CONTENT_TEXT_DIRECTION as TextDirectionType,
};

const tableInitialState: TableInterface = {
  thead: [["Heading 1", "Heading 2"]],
  tbody: [
    ["Data 1", "Data 2"],
    ["Data 4", "Data 5"],
    ["Data 7", "Data 8"],
  ],
  border: {
    style: "solid",
    color: EDITOR_TABLE_SIZE.DEFAULT_BORDER_COLOR,
    size: EDITOR_TABLE_SIZE.DEFAULT_BORDER_SIZE,
  },
  backgroundColor: EDITOR_TABLE_SIZE.DEFAULT_BACKGROUND_COLOR,
  textColor: EDITOR_TABLE_SIZE.DEFAULT_TEXT_COLOR,
  header: {
    ...tableHeaderInitialState,
  },
  content: {
    ...tableContentInitialState,
  },
};

const accordionInitialState: AccordionInterface = {
  data: [
    {
      id: uuidv4(),
      title: "Accordion 1",
      content: "Accordion 1 content",
    },
    {
      id: uuidv4(),
      title: "Accordion 2",
      content: "Accordion 2 content",
    },
  ],
  styles: {
    container: {},
    body: {},
    title: {},
    content: {},
  },
};

const tableStripedInitialState: StripedRowInterface = {
  backgroundColor: EDITOR_TABLE_SIZE.STRIPED_ROW_DEFAULT_BACKGROUND_COLOR,
  stripedType: "even",
};

export const ImageFiltersInitial: FilterType = {
  brightness: 100,
  contrast: 100,
  grayscale: 0,
  sepia: 0,
  "hue-rotate": 0,
  saturate: 100,
  blur: 0,
  invert: 0,
  opacity: 100,
  "drop-shadow": [0, 0, 0, "#212121"],
};

const initialState: BlogBuilderState = {
  blogs: {},
  isImageEditorOpen: false,
};

const ensureBlogExists = (state: BlogBuilderState, id: string) => {
  if (!state.blogs[id]) state.blogs[id] = { ...blogInitialState };
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

    toggleisImageEditorOpen: (state) => {
      state.isImageEditorOpen = !state.isImageEditorOpen;
    },

    changeHoveringComponentId: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.hoveringComponentId = action.payload;
    },

    addComponent: (
      state,
      action: PayloadAction<{
        id: string;
        type: BlockTypes;
        gridSize?: Array<number>;
        parentId?: string; // Optional Parent ID
        index: number;
      }>
    ) => {
      const { id: blogId, type, index, gridSize, parentId } = action.payload;

      /* if that blog is not exist then create */
      ensureBlogExists(state, blogId);

      const id = uuidv4();

      let block: BlockInterface = {
        id,
        type: "p",
        locationPath: parentId
          ? [
              ...(state.blogs[blogId].components[parentId]?.locationPath ?? []),
              parentId,
            ]
          : [],
        children: [],
      };

      switch (type) {
        case "h1":
          block = {
            ...block,
            type,
            text: "heading 1",
          };
          break;
        case "h2":
          block = {
            ...block,
            type,
            text: "heading 2",
          };
          break;
        case "h3":
          block = {
            ...block,
            type,
            text: "heading 3",
          };
          break;
        case "h4":
          block = {
            ...block,
            type,
            text: "heading 4",
          };
          break;
        case "h5":
          block = {
            ...block,
            type,
            text: "heading 5",
          };
          break;
        case "h6":
          block = {
            ...block,
            type,
            text: "heading 6",
          };
          break;
        case "p":
          block = {
            ...block,
            type,
            text: "paragraph",
          };
          break;
        case "button":
          block = {
            ...block,
            type,
            text: "Button",
          };
          break;
        case "row":
          block = {
            ...block,
            type,
            gridSize,
          };

          for (let i = 0; i < (gridSize?.length ?? 1); i++) {
            const id = uuidv4();

            if (Array.isArray(block.children)) block.children.push(id);

            state.blogs[blogId].components[id] = {
              id,
              type: "column",
              children: [],
            };
          }

          break;
        case "column":
          block = {
            ...block,
            type,
          };
          break;
        case "table":
          block = {
            ...block,
            type,
            gridSize,
            children: tableInitialState,
          };
          break;
        case "image":
          block = {
            ...block,
            type,
          };
          break;
        case "spacer":
          block = {
            ...block,
            type,
          };

          state.blogs[blogId].metaData.styles[id] = {
            height: Math.round(5 + Math.random() * 30),
          };

          break;
        case "divider":
          block = {
            ...block,
            type,
          };

          state.blogs[blogId].metaData.styles[id] = {
            borderTop: [1, "solid", "#dddddd"],
            width: 100,
            justifyContent: "center",
          };

          break;
        case "accordion":
          block = {
            ...block,
            type,
            children: { ...accordionInitialState },
          };

          break;
      }

      /* if it have a parentId then add that component into that parent child */
      if (
        parentId &&
        Array.isArray(state.blogs[blogId].components[parentId]?.children)
      )
        state.blogs[blogId].components[parentId].children.push(id);
      else state.blogs[blogId].content.splice(index, 0, id);

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

    updateComponentText: (
      state,
      action: PayloadAction<{
        blogId: string;
        id: string; // component id
        text: string;
      }>
    ) => {
      const { blogId, id, text } = action.payload;

      state.blogs[blogId].components[id].text = text;
    },

    createActiveBlockStyle: (
      state,
      action: PayloadAction<{
        blogId: string;
        activeBlockId: string;
      }>
    ) => {
      const { blogId, activeBlockId } = action.payload;
      const styles = state.blogs[blogId].metaData.styles;

      if (activeBlockId in styles) return state;

      styles[activeBlockId] = {};
    },

    updatePaddingStyle: (
      state,
      action: PayloadAction<{
        blogId: string;
        activeBlockId: string;
        padding: Partial<Record<PaddingType, number | "inc" | "dec">>;
      }>
    ) => {
      const { blogId, activeBlockId, padding } = action.payload;

      const styles = state.blogs[blogId].metaData.styles[activeBlockId];

      if (padding.padding !== undefined) {
        delete styles.paddingLeft;
        delete styles.paddingRight;
        delete styles.paddingTop;
        delete styles.paddingBottom;

        if (padding.padding === "inc")
          styles.padding = Number(styles.padding ?? 0) + 1;
        if (padding.padding === "dec" && Number(styles.padding) > 0)
          styles.padding = Number(styles.padding) - 1;
        if (typeof padding.padding === "number" && padding.padding >= 0) {
          styles.padding = padding.padding;
        }

        return state;
      }

      /* if there is not passed any of these padding */
      if (
        [
          padding.paddingLeft,
          padding.paddingRight,
          padding.paddingTop,
          padding.paddingBottom,
        ].every((item) => item === undefined)
      )
        return state;

      if (
        (typeof padding.paddingTop === "number" && padding.paddingTop < 0) ||
        (typeof padding.paddingBottom === "number" &&
          padding.paddingBottom < 0) ||
        (typeof padding.paddingLeft === "number" && padding.paddingLeft < 0) ||
        (typeof padding.paddingRight === "number" &&
          padding.paddingRight < 0) ||
        (padding.paddingTop === "dec" && Number(styles.paddingTop ?? 0) <= 0) ||
        (padding.paddingBottom === "dec" &&
          Number(styles.paddingBottom) <= 0) ||
        (padding.paddingLeft === "dec" &&
          Number(styles.paddingLeft ?? 0) <= 0) ||
        (padding.paddingRight === "dec" &&
          Number(styles.paddingRight ?? 0) <= 0)
      )
        return state;

      delete styles.padding;

      /* padding left ========= */
      if (
        padding.paddingLeft !== undefined &&
        typeof padding.paddingLeft === "number"
      )
        styles.paddingLeft = padding.paddingLeft;

      if (padding.paddingLeft !== undefined && padding.paddingLeft === "inc")
        styles.paddingLeft = Number(styles.paddingLeft ?? 0) + 1;

      if (
        padding.paddingLeft !== undefined &&
        padding.paddingLeft === "dec" &&
        styles.paddingLeft
      )
        styles.paddingLeft = Number(styles.paddingLeft) - 1;

      /* padding right ========= */
      if (
        padding.paddingRight !== undefined &&
        typeof padding.paddingRight === "number"
      )
        styles.paddingRight = padding.paddingRight;

      if (padding.paddingRight !== undefined && padding.paddingRight === "inc")
        styles.paddingRight = Number(styles.paddingRight ?? 0) + 1;

      if (
        padding.paddingRight !== undefined &&
        padding.paddingRight === "dec" &&
        styles.paddingRight
      )
        styles.paddingRight = Number(styles.paddingRight) - 1;

      /* padding top ========= */
      if (
        padding.paddingTop !== undefined &&
        typeof padding.paddingTop === "number"
      )
        styles.paddingTop = padding.paddingTop ?? 0;

      if (padding.paddingTop !== undefined && padding.paddingTop === "inc")
        styles.paddingTop = Number(styles.paddingTop ?? 0) + 1;

      if (
        padding.paddingTop !== undefined &&
        padding.paddingTop === "dec" &&
        styles.paddingTop
      )
        styles.paddingTop = Number(styles.paddingTop) - 1;

      /* padding bottom ========= */
      if (
        padding.paddingBottom !== undefined &&
        typeof padding.paddingBottom === "number"
      )
        styles.paddingBottom = padding.paddingBottom ?? 0;

      if (
        padding.paddingBottom !== undefined &&
        padding.paddingBottom === "inc"
      )
        styles.paddingBottom = Number(styles.paddingBottom ?? 0) + 1;

      if (
        padding.paddingBottom !== undefined &&
        padding.paddingBottom === "dec" &&
        styles.paddingBottom
      )
        styles.paddingBottom = Number(styles.paddingBottom) - 1;
    },

    togglePaddingAll: (
      state,
      action: PayloadAction<{
        blogId: string;
        activeBlockId: string;
      }>
    ) => {
      const { blogId, activeBlockId } = action.payload;

      const styles = state.blogs[blogId].metaData.styles[activeBlockId];

      if (
        [
          styles.paddingLeft,
          styles.paddingRight,
          styles.paddingTop,
          styles.paddingBottom,
        ].some((padding) => typeof padding === "number")
      ) {
        styles.padding = Math.max(
          styles.paddingLeft as number,
          styles.paddingRight as number,
          styles.paddingTop as number,
          styles.paddingBottom as number,
          0
        );

        delete styles.paddingLeft;
        delete styles.paddingRight;
        delete styles.paddingTop;
        delete styles.paddingBottom;

        return state;
      } else {
        styles.paddingLeft = styles.padding || 0;
        styles.paddingRight = styles.padding || 0;
        styles.paddingTop = styles.padding || 0;
        styles.paddingBottom = styles.padding || 0;

        delete styles.padding;

        return state;
      }
    },

    updateBorderRadiusStyle: (
      state,
      action: PayloadAction<{
        blogId: string;
        activeBlockId: string;
        borderRadius: Partial<Record<BorderRadiusType, number | "inc" | "dec">>;
      }>
    ) => {
      const { blogId, activeBlockId, borderRadius } = action.payload;

      const styles = state.blogs[blogId].metaData.styles[activeBlockId];

      if (borderRadius.borderRadius !== undefined) {
        delete styles.borderTopLeftRadius;
        delete styles.borderTopRightRadius;
        delete styles.borderBottomLeftRadius;
        delete styles.borderBottomRightRadius;

        if (borderRadius.borderRadius === "inc")
          styles.borderRadius = Number(styles.borderRadius ?? 0) + 1;
        if (
          borderRadius.borderRadius === "dec" &&
          Number(styles.borderRadius) > 0
        )
          styles.borderRadius = Number(styles.borderRadius) - 1;
        if (
          typeof borderRadius.borderRadius === "number" &&
          borderRadius.borderRadius >= 0
        ) {
          styles.borderRadius = borderRadius.borderRadius;
        }

        return state;
      }

      /* if there is not passed any of these padding */
      if (
        [
          borderRadius.borderTopLeftRadius,
          borderRadius.borderTopRightRadius,
          borderRadius.borderBottomLeftRadius,
          borderRadius.borderBottomRightRadius,
        ].every((item) => item === undefined)
      )
        return state;

      if (
        (typeof borderRadius.borderTopLeftRadius === "number" &&
          borderRadius.borderTopLeftRadius < 0) ||
        (typeof borderRadius.borderTopRightRadius === "number" &&
          borderRadius.borderTopRightRadius < 0) ||
        (typeof borderRadius.borderBottomLeftRadius === "number" &&
          borderRadius.borderBottomLeftRadius < 0) ||
        (typeof borderRadius.borderBottomRightRadius === "number" &&
          borderRadius.borderBottomRightRadius < 0) ||
        (borderRadius.borderTopLeftRadius === "dec" &&
          Number(styles.borderTopLeftRadius ?? 0) <= 0) ||
        (borderRadius.borderTopRightRadius === "dec" &&
          Number(styles.borderTopRightRadius) <= 0) ||
        (borderRadius.borderBottomLeftRadius === "dec" &&
          Number(styles.borderBottomLeftRadius ?? 0) <= 0) ||
        (borderRadius.borderBottomRightRadius === "dec" &&
          Number(styles.borderBottomRightRadius ?? 0) <= 0)
      )
        return state;

      delete styles.borderRadius;

      /* border Radius top left ========= */
      if (
        borderRadius.borderTopLeftRadius !== undefined &&
        typeof borderRadius.borderTopLeftRadius === "number"
      )
        styles.borderTopLeftRadius = borderRadius.borderTopLeftRadius;

      if (
        borderRadius.borderTopLeftRadius !== undefined &&
        borderRadius.borderTopLeftRadius === "inc"
      )
        styles.borderTopLeftRadius =
          Number(styles.borderTopLeftRadius ?? 0) + 1;

      if (
        borderRadius.borderTopLeftRadius !== undefined &&
        borderRadius.borderTopLeftRadius === "dec" &&
        styles.borderTopLeftRadius
      )
        styles.borderTopLeftRadius = Number(styles.borderTopLeftRadius) - 1;

      /* border radius top right ========= */
      if (
        borderRadius.borderTopRightRadius !== undefined &&
        typeof borderRadius.borderTopRightRadius === "number"
      )
        styles.borderTopRightRadius = borderRadius.borderTopRightRadius;

      if (
        borderRadius.borderTopRightRadius !== undefined &&
        borderRadius.borderTopRightRadius === "inc"
      )
        styles.borderTopRightRadius =
          Number(styles.borderTopRightRadius ?? 0) + 1;

      if (
        borderRadius.borderTopRightRadius !== undefined &&
        borderRadius.borderTopRightRadius === "dec" &&
        styles.borderTopRightRadius
      )
        styles.borderTopRightRadius = Number(styles.borderTopRightRadius) - 1;

      /* border radius bottom left ========= */
      if (
        borderRadius.borderBottomLeftRadius !== undefined &&
        typeof borderRadius.borderBottomLeftRadius === "number"
      )
        styles.borderBottomLeftRadius =
          borderRadius.borderBottomLeftRadius ?? 0;

      if (
        borderRadius.borderBottomLeftRadius !== undefined &&
        borderRadius.borderBottomLeftRadius === "inc"
      )
        styles.borderBottomLeftRadius =
          Number(styles.borderBottomLeftRadius ?? 0) + 1;

      if (
        borderRadius.borderBottomLeftRadius !== undefined &&
        borderRadius.borderBottomLeftRadius === "dec" &&
        styles.borderBottomLeftRadius
      )
        styles.borderBottomLeftRadius =
          Number(styles.borderBottomLeftRadius) - 1;

      /* border radius bottom right ========= */
      if (
        borderRadius.borderBottomRightRadius !== undefined &&
        typeof borderRadius.borderBottomRightRadius === "number"
      )
        styles.borderBottomRightRadius =
          borderRadius.borderBottomRightRadius ?? 0;

      if (
        borderRadius.borderBottomRightRadius !== undefined &&
        borderRadius.borderBottomRightRadius === "inc"
      )
        styles.borderBottomRightRadius =
          Number(styles.borderBottomRightRadius ?? 0) + 1;

      if (
        borderRadius.borderBottomRightRadius !== undefined &&
        borderRadius.borderBottomRightRadius === "dec" &&
        styles.borderBottomRightRadius
      )
        styles.borderBottomRightRadius =
          Number(styles.borderBottomRightRadius) - 1;
    },

    toggleBorderRadiusAll: (
      state,
      action: PayloadAction<{
        blogId: string;
        activeBlockId: string;
      }>
    ) => {
      const { blogId, activeBlockId } = action.payload;

      const styles = state.blogs[blogId].metaData.styles[activeBlockId];

      if (
        [
          styles.borderTopLeftRadius,
          styles.borderTopRightRadius,
          styles.borderBottomLeftRadius,
          styles.borderBottomRightRadius,
        ].some((borderRadius) => typeof borderRadius === "number")
      ) {
        styles.borderRadius = Math.max(
          styles.borderTopLeftRadius as number,
          styles.borderTopRightRadius as number,
          styles.borderBottomLeftRadius as number,
          styles.borderBottomRightRadius as number,
          0
        );

        delete styles.borderTopLeftRadius;
        delete styles.borderTopRightRadius;
        delete styles.borderBottomLeftRadius;
        delete styles.borderBottomRightRadius;

        return state;
      } else {
        styles.borderTopLeftRadius = styles.borderRadius || 0;
        styles.borderTopRightRadius = styles.borderRadius || 0;
        styles.borderBottomLeftRadius = styles.borderRadius || 0;
        styles.borderBottomRightRadius = styles.borderRadius || 0;

        delete styles.borderRadius;

        return state;
      }
    },

    toggleBorderAll: (
      state,
      action: PayloadAction<{
        blogId: string;
        activeBlockId: string;
      }>
    ) => {
      const { blogId, activeBlockId } = action.payload;

      if (!state.blogs[blogId].metaData.styles[activeBlockId])
        state.blogs[blogId].metaData.styles[activeBlockId] = {};

      const styles = state.blogs[blogId].metaData.styles[activeBlockId];

      const defaultValue: [number, string, string] = [
        0,
        "solid",
        "transparent",
      ];

      /* Hide details border */
      if (
        [
          styles.borderTop,
          styles.borderBottom,
          styles.borderLeft,
          styles.borderRight,
        ].some((border) => Array.isArray(border))
      ) {
        const validBorder = [
          styles.borderLeft,
          styles.borderRight,
          styles.borderTop,
          styles.borderBottom,
        ].reduce(
          (acc: [number, string, string], curr) => {
            if (!curr || !Array.isArray(curr)) return acc;

            acc[0] = Math.max(acc[0], curr[0] ?? 0);

            /* if there any valid color then update it */
            if (isValidHexColor(curr[2])) acc[2] = curr[2];

            return acc;
          },
          [...defaultValue]
        );

        delete styles.borderTop;
        delete styles.borderBottom;
        delete styles.borderLeft;
        delete styles.borderRight;

        styles.border = validBorder;

        return state;
      } else {
        styles.borderLeft = styles.border ?? defaultValue;
        styles.borderRight = styles.border ?? defaultValue;
        styles.borderTop = styles.border ?? defaultValue;
        styles.borderBottom = styles.border ?? defaultValue;

        delete styles.border;

        return state;
      }
    },

    addBorderStyle: (
      state,
      action: PayloadAction<{
        blogId: string;
        activeBlockId: string;
        border: Partial<{
          [key in BorderType]: {
            color?: string;
            style?: BorderStyleType;
            size?: number | "inc" | "dec";
          };
        }>;
      }>
    ) => {
      const {
        blogId,
        activeBlockId,
        border: { border, borderTop, borderBottom, borderLeft, borderRight },
      } = action.payload;
      const styles = state.blogs[blogId].metaData.styles[activeBlockId];

      const defaultValue: [number, string, string] = [
        0,
        "solid",
        "transparent",
      ];

      const getNewBorder = (
        borderType: BorderType,
        border: {
          color?: string;
          style?: BorderStyleType;
          size?: number | "inc" | "dec";
        }
      ) => {
        let borderValue = styles[borderType] ?? defaultValue;

        if (typeof border.size === "number") borderValue[0] = border.size;
        else if (typeof border.size === "string" && border.size === "inc")
          borderValue[0] = borderValue[0] + 1;
        else if (typeof border.size === "string" && border.size === "dec")
          borderValue[0] = borderValue[0] + 1;

        if (border.style) borderValue[1] = border.style;
        if (border.color && isValidHexColor(border.color))
          borderValue[2] = border.color;

        return borderValue;
      };

      if (border) {
        styles.border = getNewBorder("border", border);

        delete styles.borderTop;
        delete styles.borderBottom;
        delete styles.borderLeft;
        delete styles.borderRight;

        return state;
      }

      if (borderTop) styles.borderTop = getNewBorder("borderTop", borderTop);
      if (borderBottom)
        styles.borderBottom = getNewBorder("borderBottom", borderBottom);
      if (borderLeft)
        styles.borderLeft = getNewBorder("borderLeft", borderLeft);
      if (borderRight)
        styles.borderRight = getNewBorder("borderRight", borderRight);

      delete styles.border;

      return state;
    },

    updateOpacity: (
      state,
      action: PayloadAction<{
        blogId: string;
        activeBlockId: string;
        opacity: number;
      }>
    ) => {
      const { blogId, activeBlockId, opacity = 100 } = action.payload;

      const styles = state.blogs[blogId].metaData.styles[activeBlockId];

      if (opacity < 0 || opacity > 100) return state;

      styles.opacity = opacity / 100;
    },

    linkRedirect: (
      state,
      action: PayloadAction<{
        blogId: string;
        activeBlockId: string;
        link: string;
      }>
    ) => {
      const { blogId, activeBlockId, link } = action.payload;

      const component = state.blogs[blogId].components[activeBlockId];

      if (link && isValidURL(link)) component.redirect = link;
      else delete component.redirect;
    },

    setAlignment: (
      state,
      action: PayloadAction<{
        blogId: string;
        activeBlockId: string;
        alignment: flexAlignType;
      }>
    ) => {
      const { blogId, activeBlockId, alignment } = action.payload;

      if (!state.blogs[blogId].metaData.styles[activeBlockId])
        state.blogs[blogId].metaData.styles[activeBlockId] = {};

      state.blogs[blogId].metaData.styles[activeBlockId].justifyContent =
        alignment ?? "flex-start";
    },

    addStyle: (
      state,
      action: PayloadAction<{
        blogId: string;
        activeBlockId: string;
        styles: StyleType;
        defaultStyles?: StyleType /* 
        these will handle default style if that already not exist in the style state. 
        Mainly for syncing default style of the properties tab
        */;
        minStyles?: StyleType;
        maxStyles?: StyleType;
        /* 
        minStyles, maxStyles
        are for limiting the size or any style
        */
      }>
    ) => {
      const {
        blogId,
        activeBlockId,
        styles,
        defaultStyles,
        minStyles,
        maxStyles,
      } = action.payload;

      for (const key in styles) {
        const value = styles[key];

        const currentValue =
          state.blogs[blogId].metaData.styles[activeBlockId]?.[key] ??
          defaultStyles?.[key];

        /* Handling for number type values start========== */
        if (value === "inc") styles[key] = Number(currentValue ?? 0) + 1;
        else if (value === "dec") styles[key] = Number(currentValue ?? 0) - 1;
        else if (typeof value === "number") styles[key] = value;

        // Apply min and max constraints after updating the value
        if (minStyles && typeof minStyles[key] === "number")
          styles[key] = Math.max(minStyles[key], Number(styles[key]));
        if (maxStyles && typeof maxStyles[key] === "number")
          styles[key] = Math.min(maxStyles[key], Number(styles[key]));
        /* Handling for number type values end ========== */
      }

      state.blogs[blogId].metaData.styles[activeBlockId] = {
        ...(state.blogs[blogId].metaData.styles[activeBlockId] || {}),
        ...styles,
      };
    },

    removetyle: (
      state,
      action: PayloadAction<{
        blogId: string;
        activeBlockId: string;
        properyName: string;
      }>
    ) => {
      const { blogId, activeBlockId, properyName } = action.payload;

      if (
        !state.blogs[blogId].metaData.styles[activeBlockId] ||
        !state.blogs[blogId].metaData.styles[activeBlockId][properyName]
      )
        return state;

      delete state.blogs[blogId].metaData.styles[activeBlockId][properyName];
    },

    changeType: (
      state,
      action: PayloadAction<{
        blogId: string;
        activeBlockId: string;
        type: BlockTypes;
      }>
    ) => {
      const { blogId, activeBlockId, type } = action.payload;

      state.blogs[blogId].components[activeBlockId].type = type;
    },

    /*** Table============= ***/
    addTableRows: (
      state,
      action: PayloadAction<{
        blogId: string;
        id: string; // component id
      }>
    ) => {
      const { blogId, id } = action.payload;

      const tableData = state.blogs[blogId].components[id]
        .children as TableInterface;

      const columnsCount = tableData.thead[0].length;
      const rowsCount = tableData.tbody.length;

      if (rowsCount >= EDITOR_TABLE_SIZE.MAX_ROWS) return state;

      tableData.tbody.push(Array(columnsCount).fill(""));
    },

    removeTableRows: (
      state,
      action: PayloadAction<{
        blogId: string;
        id: string; // component id
      }>
    ) => {
      const { blogId, id } = action.payload;

      const tableData = state.blogs[blogId].components[id]
        .children as TableInterface;

      const rowsCount = tableData.tbody.length;

      if (rowsCount <= EDITOR_TABLE_SIZE.MIN_ROWS) return state;

      tableData.tbody.pop();
    },

    changeTableRowsCount: (
      state,
      action: PayloadAction<{
        blogId: string;
        id: string; // component id
        value: number;
      }>
    ) => {
      const { blogId, id } = action.payload;
      let newColumnsCount = action.payload.value;

      const tableData = state.blogs[blogId].components[id]
        .children as TableInterface;

      const rowsCount = tableData.tbody.length;
      const columnsCount = tableData.thead[0].length;

      if (newColumnsCount < EDITOR_TABLE_SIZE.MIN_ROWS)
        newColumnsCount = EDITOR_TABLE_SIZE.MIN_ROWS;
      else if (newColumnsCount > EDITOR_TABLE_SIZE.MAX_ROWS)
        newColumnsCount = EDITOR_TABLE_SIZE.MAX_ROWS;

      if (newColumnsCount > rowsCount) {
        const needExtraRows = newColumnsCount - rowsCount;
        tableData.tbody.push(
          ...Array(needExtraRows).fill(Array(columnsCount).fill(""))
        );
      } else {
        const needToRemoveRows = rowsCount - newColumnsCount;

        tableData.tbody.splice(
          rowsCount - needToRemoveRows - 1,
          needToRemoveRows
        );
      }
    },

    addTableColumns: (
      state,
      action: PayloadAction<{
        blogId: string;
        id: string; // component id
      }>
    ) => {
      const { blogId, id } = action.payload;

      const tableData = state.blogs[blogId].components[id]
        .children as TableInterface;

      const columnsCount = tableData.thead[0].length;

      if (columnsCount >= EDITOR_TABLE_SIZE.MAX_COLUMNS) return state;

      tableData.thead.forEach((row) => row.push(`Heading ${columnsCount + 1}`));
      tableData.tbody.forEach((row) => row.push(""));
    },

    removeTableColumns: (
      state,
      action: PayloadAction<{
        blogId: string;
        id: string; // component id
      }>
    ) => {
      const { blogId, id } = action.payload;

      const tableData = state.blogs[blogId].components[id]
        .children as TableInterface;

      const columnsCount = tableData.thead[0].length;

      if (columnsCount <= EDITOR_TABLE_SIZE.MIN_COLUMNS) return state;

      tableData.thead.forEach((row) => row.pop());
      tableData.tbody.forEach((row) => row.pop());
    },

    changeTableColumnsCount: (
      state,
      action: PayloadAction<{
        blogId: string;
        id: string; // component id
        value: number;
      }>
    ) => {
      const { blogId, id } = action.payload;
      let newColumnsCount = action.payload.value;

      const tableData = state.blogs[blogId].components[id]
        .children as TableInterface;

      const columnsCount = tableData.thead[0].length;

      if (newColumnsCount < EDITOR_TABLE_SIZE.MIN_COLUMNS)
        newColumnsCount = EDITOR_TABLE_SIZE.MIN_COLUMNS;
      else if (newColumnsCount > EDITOR_TABLE_SIZE.MAX_COLUMNS)
        newColumnsCount = EDITOR_TABLE_SIZE.MAX_COLUMNS;

      if (newColumnsCount > columnsCount) {
        const needExtraColumns = newColumnsCount - columnsCount;

        tableData.thead.forEach((row) =>
          row.push(
            ...Array(needExtraColumns).fill(`Heading ${columnsCount + 1}`)
          )
        );

        tableData.tbody.forEach((row) =>
          row.push(...Array(needExtraColumns).fill(""))
        );
      } else {
        const needToRemoveColumns = columnsCount - newColumnsCount;

        tableData.thead.forEach((row) =>
          row.splice(columnsCount - needToRemoveColumns, needToRemoveColumns)
        );

        tableData.tbody.forEach((row) =>
          row.splice(columnsCount - needToRemoveColumns, needToRemoveColumns)
        );
      }
    },

    removeTableFullRow: (
      state,
      action: PayloadAction<{
        blogId: string;
        id: string; // component id
        index: number;
      }>
    ) => {
      const { blogId, id, index } = action.payload;

      const tableData = state.blogs[blogId].components[id]
        .children as TableInterface;

      tableData.tbody.splice(index, 1);
    },

    removeTableFullColumn: (
      state,
      action: PayloadAction<{
        blogId: string;
        id: string; // component id
        index: number;
      }>
    ) => {
      const { blogId, id, index } = action.payload;

      const tableData = state.blogs[blogId].components[id]
        .children as TableInterface;

      /* if only one column remain then prevent deletion */
      if (
        tableData.thead[0].length === 1 ||
        index < 0 ||
        index >= tableData.thead[0].length
      )
        return state;

      tableData.thead.forEach((row) => {
        row.splice(index, 1);
        return row;
      });

      tableData.tbody.forEach((row) => {
        row.splice(index, 1);
        return row;
      });
    },

    addRowColumnBeforeAfterOfCurrent: (
      state,
      action: PayloadAction<{
        blogId: string;
        id: string; // component id
        type: "row" | "column";
        addType: "before" | "after";
        index: number;
      }>
    ) => {
      const { blogId, id, type, addType, index } = action.payload;

      const tableData = state.blogs[blogId].components[id]
        .children as TableInterface;
      const columnsCount = tableData.thead[0].length;
      const rowsCount = tableData.tbody.length;

      if (
        (type == "column" && columnsCount >= EDITOR_TABLE_SIZE.MAX_COLUMNS) ||
        (type == "row" && rowsCount >= EDITOR_TABLE_SIZE.MAX_ROWS)
      )
        return state;

      const targetIndex = addType === "before" ? index : index + 1;

      if (type === "row")
        tableData.tbody.splice(targetIndex, 0, Array(columnsCount).fill(""));
      else {
        tableData.thead.map((row) => {
          row.splice(targetIndex, 0, "Heading");
          return row;
        });

        tableData.tbody.map((row) => {
          row.splice(targetIndex, 0, "");
          return row;
        });
      }
    },

    addTableBorderStyle: (
      state,
      action: PayloadAction<{
        blogId: string;
        id: string; // component id
        style?: BorderStyleType;
        color?: string;
        size?: number | null | "increase" | "decrease";
      }>
    ) => {
      const { blogId, id, style, color, size: inputSize } = action.payload;

      if (!style && !color && inputSize === undefined) return state;

      const tableData = state.blogs[blogId].components[id]
        .children as TableInterface;

      if (!tableData) return state;

      // Initialize border if not present
      tableData.border = tableData.border || {};

      // Handle size updates
      if (inputSize !== null || inputSize !== undefined) {
        const currentSize = Number(tableData.border.size) || 0;

        if (typeof inputSize === "string") {
          const isWithinBounds = (size: number) =>
            size >= EDITOR_TABLE_SIZE.MIN_BORDER_SIZE &&
            size <= EDITOR_TABLE_SIZE.MAX_BORDER_SIZE;

          const newSize =
            inputSize === "increase"
              ? currentSize + 1
              : inputSize === "decrease"
              ? currentSize - 1
              : currentSize;

          if (isWithinBounds(newSize)) {
            tableData.border.size = newSize;
          }
        } else if (
          typeof inputSize === "number" &&
          inputSize >= EDITOR_TABLE_SIZE.MIN_BORDER_SIZE &&
          inputSize <= EDITOR_TABLE_SIZE.MAX_BORDER_SIZE
        ) {
          tableData.border.size = inputSize;
        }
      }

      // Update style and color
      if (style) tableData.border.style = style;
      if (color) tableData.border.color = color;
    },

    addTableBackgroundStyle: (
      state,
      action: PayloadAction<{
        blogId: string;
        id: string; // component id
        backgroundColor: string;
      }>
    ) => {
      const { blogId, id, backgroundColor } = action.payload;

      const tableData = state.blogs[blogId].components[id]
        .children as TableInterface;

      if (!isValidHexColor(backgroundColor)) return state;

      tableData.backgroundColor = backgroundColor;
    },

    addTableTextStyle: (
      state,
      action: PayloadAction<{
        blogId: string;
        id: string; // component id
        textColor: string;
      }>
    ) => {
      const { blogId, id, textColor } = action.payload;

      const tableData = state.blogs[blogId].components[id]
        .children as TableInterface;

      if (!isValidHexColor(textColor)) return state;

      tableData.textColor = textColor;
    },

    addTableStripedRow: (
      state,
      action: PayloadAction<{
        blogId: string;
        id: string; // component id
        backgroundColor?: string | null;
      }>
    ) => {
      const { blogId, id, backgroundColor } = action.payload;

      const tableData = state.blogs[blogId].components[id]
        .children as TableInterface;

      if (backgroundColor && !isValidHexColor(backgroundColor)) return state;

      if (!tableData.stripedRow)
        tableData.stripedRow = {
          ...tableStripedInitialState,
        };

      tableData.stripedRow.backgroundColor =
        backgroundColor ||
        EDITOR_TABLE_SIZE.STRIPED_ROW_DEFAULT_BACKGROUND_COLOR;
    },

    changeTableStripedTypeRow: (
      state,
      action: PayloadAction<{
        blogId: string;
        id: string; // component id
        type?: StripedType;
      }>
    ) => {
      const { blogId, id, type: stripedType } = action.payload;

      const tableData = state.blogs[blogId].components[id]
        .children as TableInterface;

      if (!tableData.stripedRow)
        tableData.stripedRow = {
          ...tableStripedInitialState,
        };

      tableData.stripedRow.stripedType = stripedType || "even";
    },

    clearTableStripedRow: (
      state,
      action: PayloadAction<{
        blogId: string;
        id: string; // component id
      }>
    ) => {
      const { blogId, id } = action.payload;

      const tableData = state.blogs[blogId].components[id]
        .children as TableInterface;

      tableData.stripedRow = undefined;

      return state;
    },

    changeCellContent: (
      state,
      action: PayloadAction<{
        blogId: string;
        id: string; // component id
        type: "thead" | "tbody";
        rowIndex: number;
        colIndex: number;
        content: string;
      }>
    ) => {
      const { blogId, id, rowIndex, colIndex, type, content } = action.payload;

      const tableData = state.blogs[blogId].components[id]
        .children as TableInterface;

      if (type === "thead") tableData.thead[rowIndex][colIndex] = content;
      else tableData.tbody[rowIndex][colIndex] = content;
    },

    /* table header */
    changeTableHeaderStyle: (
      state,
      action: PayloadAction<{
        blogId: string;
        id: string; // component id
        backgroundColor?: string;
        textColor?: string;
        fontSize?: number | "inc" | "dec";
        fontWeight?: FontWeightType;
        align?: AlignType;
      }>
    ) => {
      const {
        blogId,
        id,
        backgroundColor,
        textColor,
        fontSize,
        fontWeight,
        align,
      } = action.payload;

      const tableData = state.blogs[blogId].components[id]
        .children as TableInterface;

      // Ensure header exists
      if (!tableData.header) tableData.header = { ...tableHeaderInitialState };

      const header = tableData.header as Required<TableHeaderInterface>;

      // Validation: Return early if no valid updates are provided
      const isInvalidFontSize =
        (fontSize === "inc" &&
          header.fontSize >= EDITOR_TABLE_SIZE.MAX_HEADER_FONT_SIZE) ||
        (fontSize === "dec" &&
          header.fontSize <= EDITOR_TABLE_SIZE.MIN_HEADER_FONT_SIZE) ||
        (typeof fontSize === "number" &&
          (fontSize < EDITOR_TABLE_SIZE.MIN_HEADER_FONT_SIZE ||
            fontSize > EDITOR_TABLE_SIZE.MAX_HEADER_FONT_SIZE));

      const isInvalidColors =
        (backgroundColor && !isValidHexColor(backgroundColor)) ||
        (textColor && !isValidHexColor(textColor));

      if (!backgroundColor && !textColor && !fontSize && !fontWeight && !align)
        return state;
      if (isInvalidFontSize || isInvalidColors) return state;

      // Update header properties
      if (backgroundColor) header.backgroundColor = backgroundColor;
      if (textColor) tableData.header.textColor = textColor;

      if (fontSize === "inc") header.fontSize += 1;
      else if (fontSize === "dec") header.fontSize -= 1;
      else if (typeof fontSize === "number") header.fontSize = fontSize;

      if (fontWeight) header.fontWeight = fontWeight;
      if (align) header.align = align;
    },

    /* table content */
    changeTableContentStyle: (
      state,
      action: PayloadAction<{
        blogId: string;
        id: string; // component id
        textColor?: string;
        fontSize?: number | "inc" | "dec";
        fontWeight?: FontWeightType;
        align?: AlignType;
        letterSpacing?: number | "inc" | "dec";
        lineHeight?: LineHeightType;
        textDirection?: TextDirectionType;
      }>
    ) => {
      const {
        blogId,
        id,
        textColor,
        fontSize,
        fontWeight,
        align,
        textDirection,
        letterSpacing,
        lineHeight,
      } = action.payload;

      const tableData = state.blogs[blogId].components[id]
        .children as TableInterface;

      // Ensure content exists
      if (!tableData.content)
        tableData.content = { ...tableContentInitialState };

      const content = tableData.content as Required<TableContentInterface>;

      // Validation: Return early if no valid updates are provided
      const isInvalidFontSize =
        (fontSize === "inc" &&
          content.fontSize >= EDITOR_TABLE_SIZE.MAX_CONTENT_FONT_SIZE) ||
        (fontSize === "dec" &&
          content.fontSize <= EDITOR_TABLE_SIZE.MIN_CONTENT_FONT_SIZE) ||
        (typeof fontSize === "number" &&
          (fontSize < EDITOR_TABLE_SIZE.MIN_CONTENT_FONT_SIZE ||
            fontSize > EDITOR_TABLE_SIZE.MAX_CONTENT_FONT_SIZE));

      // Validation: Return early if no valid updates are provided
      const isInvalidLetterSpacing =
        (letterSpacing === "inc" &&
          content.letterSpacing >=
            EDITOR_TABLE_SIZE.MAX_CONTENT_LETTER_SPACING) ||
        (letterSpacing === "dec" &&
          content.letterSpacing <=
            EDITOR_TABLE_SIZE.MIN_CONTENT_LETTER_SPACING) ||
        (typeof letterSpacing === "number" &&
          (letterSpacing < EDITOR_TABLE_SIZE.MIN_CONTENT_LETTER_SPACING ||
            letterSpacing > EDITOR_TABLE_SIZE.MAX_CONTENT_LETTER_SPACING));

      const isInvalidColors = textColor && !isValidHexColor(textColor);

      if (
        !textColor &&
        !fontSize &&
        !fontWeight &&
        !align &&
        !textDirection &&
        !lineHeight &&
        !letterSpacing
      )
        return state;

      if (isInvalidFontSize || isInvalidLetterSpacing || isInvalidColors)
        return state;

      // Update content properties
      if (textColor) tableData.content.textColor = textColor;

      if (fontSize === "inc") content.fontSize += 1;
      else if (fontSize === "dec") content.fontSize -= 1;
      else if (typeof fontSize === "number") content.fontSize = fontSize;

      if (letterSpacing === "inc") content.letterSpacing += 1;
      else if (letterSpacing === "dec") content.letterSpacing -= 1;
      else if (typeof letterSpacing === "number")
        content.letterSpacing = letterSpacing;

      if (fontWeight) content.fontWeight = fontWeight;
      if (align) content.align = align;

      if (textDirection) content.textDirection = textDirection;
      if (lineHeight) content.lineHeight = lineHeight;
    },

    /* image component */
    changeImage: (
      state,
      action: PayloadAction<{
        blogId: string;
        id: string; // component id
        image: string;
      }>
    ) => {
      const { blogId, id, image } = action.payload;

      const blogData = state.blogs[blogId];

      blogData.metaData.imgLinks[id] = image;
    },

    updateImageContent: (
      state,
      action: PayloadAction<{
        blogId: string;
        id: string; // component id
        url?: string;
        alt?: string;
        caption?: string;
      }>
    ) => {
      const { blogId, id, url, alt, caption } = action.payload;

      const blogData = state.blogs[blogId];
      const blockComponent = state.blogs[blogId].components[id];

      if (url) blogData.metaData.imgLinks[id] = url;
      if (alt) blockComponent.alt = alt;
      if (caption) blockComponent.caption = caption;
    },

    /* image filter  */
    addImageFilter: (
      state,
      action: PayloadAction<{
        blogId: string;
        id: string; // component id
        filter: FilterType;
      }>
    ) => {
      const { blogId, id } = action.payload;
      let { filter } = action.payload;

      if (!state.blogs[blogId]?.metaData?.styles[id])
        state.blogs[blogId].metaData.styles[id] = {};

      const blockStyle = state.blogs[blogId]?.metaData?.styles[id];

      blockStyle.filter = {
        ...(blockStyle.filter || {}),
        ...(filter as FilterType),
      };
    },

    resetImageFilter: (
      state,
      action: PayloadAction<{
        blogId: string;
        id: string; // component id
      }>
    ) => {
      const { blogId, id } = action.payload;

      const blockStyle = state.blogs[blogId]?.metaData?.styles[id];

      if (!blockStyle) return state;

      delete blockStyle.filter;
    },

    setImageWidth: (
      state,
      action: PayloadAction<{
        blogId: string;
        id: string; // component id
        width: number | "auto";
      }>
    ) => {
      const { blogId, id, width } = action.payload;

      if (!state.blogs[blogId]?.metaData?.styles[id])
        state.blogs[blogId].metaData.styles[id] = {};

      const blockStyle = state.blogs[blogId]?.metaData?.styles[id];

      blockStyle.width = width;
    },

    /* spacer ======== */
    changeSpacerSize: (
      state,
      action: PayloadAction<{
        blogId: string;
        id: string; // component id
        height: number | "inc" | "dec";
      }>
    ) => {
      const { blogId, id, height } = action.payload;

      if (!state.blogs[blogId]?.metaData?.styles[id])
        state.blogs[blogId].metaData.styles[id] = {
          height: 1,
        };

      const blockStyle = state.blogs[blogId]?.metaData?.styles[id];

      if (height === "inc") blockStyle.height = Number(blockStyle.height) + 1;
      else if (height === "dec")
        blockStyle.height = Math.max(Number(blockStyle.height) - 1, 1);
      else blockStyle.height = Math.max(height, 1);
    },

    /* accordion ========== */
    changeAccordionContent: (
      state,
      action: PayloadAction<{
        blogId: string;
        id: string; // component id
        data: {
          index: number;
          title?: string;
          content?: string;
        };
      }>
    ) => {
      const { blogId, id, data } = action.payload;
      const blogData = state.blogs[blogId];
      if (!blogData?.components[id]) return;

      const blockComponent = blogData.components[id];
      if (!blockComponent.children) {
        blockComponent.children = { ...accordionInitialState };
      }

      const accordionData = blockComponent.children as AccordionInterface;
      const item = accordionData.data[data.index];
      if (!item) return;

      if (data.title !== undefined) item.title = data.title;
      if (data.content !== undefined) item.content = data.content;
    },

    changeAccordionCount: (
      state,
      action: PayloadAction<{
        blogId: string;
        id: string; // component id
        count: number | "inc" | "dec";
      }>
    ) => {
      const { blogId, id, count } = action.payload;
      const blogData = state.blogs[blogId];
      if (!blogData?.components[id]) return;

      let blockComponent = blogData.components[id]
        ?.children as AccordionInterface;
      if (!blockComponent) {
        blockComponent = { ...accordionInitialState };
      }

      const { data } = blockComponent;

      if (count === "inc") {
        data.push({
          id: uuidv4(),
          title: "Accordion",
          content: "Accordion content",
        });
      } else if (count === "dec") {
        if (data.length > 1) data.pop();
      } else if (typeof count === "number" && count >= 1) {
        if (count > data.length) {
          data.push(
            ...Array.from({ length: count - data.length }, () => ({
              id: uuidv4(),
              title: "Accordion",
              content: "Accordion content",
            }))
          );
        } else {
          data.splice(count);
        }
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  createBlog,
  addComponent,
  toggleisImageEditorOpen,
  changeHoveringComponentId,
  updateTitle,
  toggleEditorOrPreview,
  changeActiveBlock,
  updateComponentText,
  createActiveBlockStyle,
  updatePaddingStyle,
  togglePaddingAll,
  toggleBorderRadiusAll,
  updateBorderRadiusStyle,
  addBorderStyle,
  updateOpacity,
  linkRedirect,
  toggleBorderAll,
  setAlignment,
  addStyle,
  removetyle,
  changeType,
  /*** Table============= ***/
  addTableRows,
  removeTableRows,
  changeTableRowsCount,
  addTableColumns,
  removeTableColumns,
  changeTableColumnsCount,
  removeTableFullRow,
  removeTableFullColumn,
  addRowColumnBeforeAfterOfCurrent,
  addTableBorderStyle,
  addTableBackgroundStyle,
  addTableTextStyle,
  addTableStripedRow,
  changeTableStripedTypeRow,
  clearTableStripedRow,
  changeCellContent,
  /* table header */
  changeTableHeaderStyle,
  /* table content */
  changeTableContentStyle,
  /* image component */
  changeImage,
  updateImageContent,
  /* image filter  */
  addImageFilter,
  resetImageFilter,
  setImageWidth,
  /* spacer ======== */
  changeSpacerSize,
  /* accordion ========== */
  changeAccordionContent,
  changeAccordionCount,
} = blogBuilderSlice.actions;

export default blogBuilderSlice.reducer;
