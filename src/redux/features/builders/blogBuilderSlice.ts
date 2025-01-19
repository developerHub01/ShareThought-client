import { defaultGlobalStyles, EDITOR_TABLE_SIZE } from "@/constant";
import { isValidHexColor } from "@/utils";
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
export type BorderStyleType = "solid" | "dotted" | "dashed";
export type StripedType = "even" | "odd";
export type AlignType = "left" | "center" | "right" | "justify";
export type FontWeightType = "bold" | "normal";

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

const tableHeaderInitialState: TableHeaderInterface = {
  backgroundColor: EDITOR_TABLE_SIZE.DEFAULT_HEADER_BACKGROUND_COLOR,
  textColor: EDITOR_TABLE_SIZE.DEFAULT_HEADER_TEXT_COLOR,
  fontSize: EDITOR_TABLE_SIZE.DEFAULT_HEADER_FONT_SIZE,
  fontWeight: EDITOR_TABLE_SIZE.DEFAULT_HEADER_FONT_WEIGHT as FontWeightType,
  align: "left",
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
};

const tableStripedInitialState: StripedRowInterface = {
  backgroundColor: EDITOR_TABLE_SIZE.STRIPED_ROW_DEFAULT_BACKGROUND_COLOR,
  stripedType: "even",
};

const initialState: BlogBuilderState = {
  blogs: {},
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

    /**
     * Table=============
     * ***/
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
  },
});

// Action creators are generated for each case reducer function
export const {
  createBlog,
  addComponent,
  updateTitle,
  toggleEditorOrPreview,
  changeActiveBlock,
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
  changeTableHeaderStyle,
} = blogBuilderSlice.actions;

export default blogBuilderSlice.reducer;
