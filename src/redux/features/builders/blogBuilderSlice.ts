import { BlockquoteVariantType } from "@/components/ui/blockquote";
import {
  defaultGlobalStyles,
  EDITOR_TABLE_SIZE,
  EDITOR_DEFAULT_VALUES,
} from "@/constant";
import { isValidHexColor, isValidURL } from "@/utils";
import { createSlice, current } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export type ScreenTypes = "desktop" | "mobile";

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
  | "video"
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
export type MarginType = "marginTop" | "marginBottom";

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
  parentId?: string | null;
  children?:
    | Array<string>
    | TableInterface
    | AccordionInterface
    | BlockquoteInterface;
  codeThemeMode?: CodeThemeModeType;
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

export interface BlockquoteInterface {
  quote: string;
  author?: string;
  variant?: BlockquoteVariantType;
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

export type CodeThemeModeType = "dark" | "light";

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
  mobileStyles: StylesInterface;
  hoverStyles: {
    [key: string]: Record<string, string | number>;
  };
  globalStyles: {
    desktop: Record<string, Record<string, unknown>>;
    mobile: Record<string, Record<string, unknown>>;
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
      screenType: ScreenTypes;
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
    mobileStyles: {} as StylesInterface,
    hoverStyles: {} as Record<string, Record<string, string | number>>,
    globalStyles: defaultGlobalStyles,
  },
  editorOrPreview: "editor" as editorOrPreviewTypes,
  activeBlock: null,
  components: {},
  hoveringComponentId: null,
  screenType:
    "desktop" as ScreenTypes /* it will determine that is current style mode is desktop or mobile */,
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

const ensureBlogExists = (state: BlogBuilderState, blogId: string) => {
  if (!state.blogs[blogId]) state.blogs[blogId] = { ...blogInitialState };
};

const addDefaultStylesAfterComponentAdd = (
  state: BlogBuilderState,
  blogId: string,
  id: string,
  type: BlockTypes
) => {
  if (!state.blogs[blogId]) return;

  if (!state.blogs[blogId].metaData.styles[id])
    state.blogs[blogId].metaData.styles[id] = {};

  if (type in EDITOR_DEFAULT_VALUES.MARGIN) {
    state.blogs[blogId].metaData.styles[id] = {
      ...state.blogs[blogId].metaData.styles[id],
      ...(EDITOR_DEFAULT_VALUES.MARGIN as Record<string, any>)[type],
    };
  }
};

const applyMinMaxStyles = (
  styles: StyleType,
  key: string,
  minStyles?: StyleType,
  maxStyles?: StyleType
) => {
  if (minStyles && typeof minStyles[key] === "number")
    styles[key] = Math.max(minStyles[key], Number(styles[key]));

  if (maxStyles && typeof maxStyles[key] === "number")
    styles[key] = Math.min(maxStyles[key], Number(styles[key]));

  return styles[key];
};

const updateStyleValue = (value: any, currentValue: any) => {
  if (value === "inc") return Number(currentValue ?? 0) + 1;
  if (value === "dec") return Number(currentValue ?? 0) - 1;
  return value ?? currentValue;
};

const exampleCode = `\`\`\`js
console.log("Hello world");
\`\`\``;

const exampleBlockquote: BlockquoteInterface = {
  quote: "Lorem ipsum dolor sit amet.",
  author: "John Doe",
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

    toggleScreenType: (
      state,
      action: PayloadAction<{
        id: string;
      }>
    ) => {
      const { id } = action.payload;

      /* if that blog is not exist then create */
      ensureBlogExists(state, id);

      state.blogs[id].screenType === "desktop"
        ? (state.blogs[id].screenType = "mobile")
        : (state.blogs[id].screenType = "desktop");
    },

    toggleisImageEditorOpen: (state) => {
      state.isImageEditorOpen = !state.isImageEditorOpen;
    },

    changeHoveringComponentId: (
      state,
      action: PayloadAction<string | null>
    ) => {
      if (state.hoveringComponentId === action.payload) return;
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
        parentId,
      };

      addDefaultStylesAfterComponentAdd(state, blogId, id, type);

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
            children: [],
          };

          for (let i = 0; i < (gridSize?.length ?? 1); i++) {
            const id = uuidv4();

            if (Array.isArray(block.children)) block.children.push(id);

            state.blogs[blogId].components[id] = {
              id,
              type: "column",
              parentId: block.id,
              children: [],
            };
          }

          break;
        case "column":
          block = {
            ...block,
            type,
            children: [],
          };
          break;
        case "code":
          block = {
            ...block,
            type,
            text: exampleCode,
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
        case "video":
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
        case "blockquote":
          block = {
            ...block,
            type,
            children: exampleBlockquote,
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

    gotoUpDownComponent: (
      state,
      action: PayloadAction<{
        blogId: string;
        type: "up" | "down";
      }>
    ) => {
      const { blogId, type } = action.payload;

      if (!state.blogs[blogId]) return;

      const { activeBlock, components } = state.blogs[blogId];

      if (!activeBlock) return;

      const activeComponent = components[activeBlock];

      if (!activeComponent) return;

      if (
        type === "up" &&
        activeComponent.parentId &&
        components[activeComponent.parentId]
      )
        state.blogs[blogId].activeBlock = activeComponent.parentId ?? null;

      if (
        type === "down" &&
        Array.isArray(activeComponent.children) &&
        activeComponent.children.length
      )
        state.blogs[blogId].activeBlock = activeComponent.children[0];
    },

    gotoPreviousNextComponent: (
      state,
      action: PayloadAction<{
        blogId: string;
        type: "prev" | "next";
      }>
    ) => {
      const { blogId, type } = action.payload;

      if (!state.blogs[blogId]) return;

      const { activeBlock, components } = state.blogs[blogId];

      if (!activeBlock) return;

      const moveActiveBlock = (id: string) => {
        const currentComponent = components[id];

        if (!currentComponent) return;

        if (type === "prev") {
          let tempCurrentComponent = currentComponent;

          console.log(tempCurrentComponent.parentId);

          while (tempCurrentComponent.parentId) {
            const parentComponent = components[tempCurrentComponent.parentId];

            if (
              !parentComponent ||
              !Array.isArray(parentComponent.children) ||
              !parentComponent.children.length
            )
              break;

            const indexInParentChildren = parentComponent.children.indexOf(
              tempCurrentComponent.id
            );

            console.log({ indexInParentChildren });

            if (indexInParentChildren < 0) break;

            if (
              indexInParentChildren === 0 &&
              parentComponent.children.length === 1
            ) {
              return (state.blogs[blogId].activeBlock = parentComponent.id);
            }

            if (
              indexInParentChildren > 0 &&
              indexInParentChildren < parentComponent.children.length
            ) {
              const targetedComponentId =
                parentComponent.children[indexInParentChildren - 1];
              if (!targetedComponentId) break;

              let targetedComponent = components[targetedComponentId];
              if (!targetedComponent) break;

              console.log({
                targetedComponentId,
                targetedComponent: current(targetedComponent),
              });

              if (
                !Array.isArray(targetedComponent.children) ||
                !targetedComponent.children.length
              )
                return (state.blogs[blogId].activeBlock = targetedComponentId);

              while (
                Array.isArray(targetedComponent.children) &&
                targetedComponent.children.length
              ) {
                targetedComponent =
                  components[
                    targetedComponent.children[
                      targetedComponent.children.length - 1
                    ]
                  ];
              }
              console.log({
                targetedComponent: current(targetedComponent),
              });
              state.blogs[blogId].activeBlock = targetedComponent.id;
            }

            tempCurrentComponent = parentComponent;
          }

          const indexInParentChildren = state.blogs[blogId].content.indexOf(
            tempCurrentComponent.id
          );

          if (
            indexInParentChildren < 0 ||
            indexInParentChildren >= state.blogs[blogId].content.length
          )
            return;

          const targetdComponentId =
            state.blogs[blogId].content[indexInParentChildren - 1];
          let targetedComponent = components[targetdComponentId];

          console.log({ targetdComponentId });
          console.log({ targetedComponent: current(targetedComponent) });

          while (
            Array.isArray(targetedComponent.children) &&
            targetedComponent.children.length
          ) {
            targetedComponent =
              components[
                targetedComponent.children[
                  targetedComponent.children.length - 1
                ]
              ];
          }

          console.log({ targetdComponentId: targetedComponent.id });
          console.log({ targetedComponent: current(targetedComponent) });

          return (state.blogs[blogId].activeBlock = targetedComponent.id);
        } else {
          if (
            !currentComponent.parentId &&
            (!Array.isArray(currentComponent.children) ||
              !currentComponent.children.length)
          ) {
            const contentList = state.blogs[blogId].content;

            const componentIndexInContent = contentList.indexOf(id);

            if (componentIndexInContent >= contentList.length - 1) return;

            state.blogs[blogId].activeBlock =
              contentList[componentIndexInContent + 1];
          } else if (
            Array.isArray(currentComponent.children) &&
            currentComponent.children.length
          ) {
            state.blogs[blogId].activeBlock = currentComponent.children[0];
          } else if (currentComponent.parentId) {
            const parentComponent = components[currentComponent.parentId];

            if (!parentComponent) return;

            const parentChildren =
              Array.isArray(parentComponent.children) &&
              parentComponent.children;

            if (!parentChildren || !parentChildren.length) return;

            const indexInParentChildren = parentChildren.indexOf(id);

            if (indexInParentChildren >= parentChildren.length - 1) {
              /* here is the main logic and crucial part. when there will be no siblings next then go to next sibling of parents and find parent sinbling untill we find or rich root */
              let tempCurrentComponent = currentComponent;
              while (tempCurrentComponent.parentId) {
                const parentComponent =
                  components[tempCurrentComponent.parentId];
                if (!parentComponent) return;

                if (
                  !Array.isArray(parentComponent.children) ||
                  !parentComponent.children.length
                )
                  return;

                const indexInParentChildren = parentComponent.children.indexOf(
                  tempCurrentComponent.id
                );

                if (indexInParentChildren < 0) return;

                if (
                  indexInParentChildren >= 0 &&
                  indexInParentChildren < parentComponent.children.length - 1
                )
                  return (state.blogs[blogId].activeBlock =
                    parentComponent.children[indexInParentChildren + 1]);

                tempCurrentComponent = parentComponent;
              }

              const indexInParentChildren = state.blogs[blogId].content.indexOf(
                tempCurrentComponent.id
              );

              if (
                indexInParentChildren < 0 ||
                indexInParentChildren >= state.blogs[blogId].content.length
              )
                return;

              return (state.blogs[blogId].activeBlock =
                state.blogs[blogId].content[indexInParentChildren + 1]);
            }
          }
        }
      };

      moveActiveBlock(activeBlock);
    },

    removeComponent: (
      state,
      action: PayloadAction<{
        blogId: string;
        id: string;
      }>
    ) => {
      const { id, blogId } = action.payload;

      if (!state.blogs[blogId] || !state.blogs[blogId].components[id]) return;

      state.blogs[blogId].activeBlock = null;

      /* 
      process is that we will start from a starting component and traverse through childrens and each time we will check if its parent is a deletion-candidate or not. if not then traverse upwards and check untill parent children count is more then 1. and children count are 1 then also add them into candidate  
      */
      const removeIdCandidatesRecursive = (
        id: string,
        candidates: Record<string, true> = {}
      ) => {
        const component = state.blogs[blogId].components[id];

        if (!component) return candidates;

        const parentId = component.parentId;

        const parentChildren =
          (parentId &&
            Array.isArray(
              state.blogs[blogId]?.components[parentId]?.children
            ) &&
            state.blogs[blogId]?.components[parentId]?.children) ||
          [];

        if (
          parentId &&
          parentChildren.length === 1 &&
          !candidates[parentId] &&
          state.blogs[blogId]?.components[parentId].type !==
            "column" /* because we don't want to remove parent which is column when its have only one children to remove */
        ) {
          /* here go through upwards and check untill parents children count is 1 */
          let currentId = id;

          while (true) {
            const component = state.blogs[blogId].components[currentId];
            const parentId = component.parentId;

            /* 
            if parentid not exist or if parentId exist then 
            if that parentId is already in deletion candidate or 
            if that parentId exist but children count is more than 1 then
            */
            if (
              !parentId ||
              candidates[parentId] ||
              (Array.isArray(
                state.blogs[blogId].components[parentId].children
              ) &&
                state.blogs[blogId].components[parentId].children.length > 1)
            )
              break;

            candidates[parentId] = true;

            currentId = parentId;
          }
        }

        if (component) {
          candidates[id] = true;
        } else return candidates;

        if (!Array.isArray(component?.children)) return candidates;

        component.children.forEach((currentId) =>
          removeIdCandidatesRecursive(currentId, candidates)
        );

        return candidates;
      };

      /* finding list of ids that need to remove */
      const idsToRemove = Object.keys(removeIdCandidatesRecursive(id));

      /* removig components, styles, imgLinks with ids of idsToRemove */
      idsToRemove.map((id) => {
        const component = state.blogs[blogId].components[id];
        delete state.blogs[blogId].components[id];
        delete state.blogs[blogId].metaData?.styles[id];
        delete state.blogs[blogId].metaData?.imgLinks[id];

        if (!component?.parentId) return;

        const parentId = component?.parentId;

        if (
          !parentId ||
          !Array.isArray(state.blogs[blogId].components[parentId]?.children)
        )
          return;

        let matchedIndex = -1;
        state.blogs[blogId].components[parentId].children = state.blogs[
          blogId
        ].components[parentId].children.filter((currentId, index) => {
          if (currentId === id) matchedIndex = index;
          return currentId !== id;
        });

        if (state.blogs[blogId].components[parentId].type !== "row") return;

        state.blogs[blogId].components[parentId].gridSize?.splice(
          matchedIndex,
          1
        );
      });

      /* removig content with ids of idsToRemove */
      state.blogs[blogId].content = state.blogs[blogId].content.filter(
        (id) => !idsToRemove.includes(id)
      );
    },

    duplicateComponent: (
      state,
      action: PayloadAction<{
        blogId: string;
        id: string;
      }>
    ) => {
      const { id, blogId } = action.payload;
      if (!state.blogs[blogId] || !state.blogs[blogId].components[id])
        return state;

      const styles: StylesInterface = {};
      const imgLinks: Record<string, string> = {};
      const components: Record<string, BlockInterface> = {};
      const startId = uuidv4();

      const replicateComponentChildrens = (
        id: string,
        parentId: string | null = null,
        isRoot: boolean = false
      ) => {
        const component = state.blogs[blogId].components[id];
        if (!component) return;

        const newId = isRoot ? startId : uuidv4();

        components[newId] = {
          ...structuredClone(
            current(component)
          ) /* to make sure to deep copy */,
          id: newId,
          parentId,
        };

        /* if the component is first component or not */
        if (parentId && components[parentId]) {
          const componentIndex = (
            components[parentId].children as Array<string>
          ).indexOf(id);

          (components[parentId].children as Array<string>)[componentIndex] =
            newId;
        }

        if (state.blogs[blogId].metaData.styles[id]) {
          styles[newId] = state.blogs[blogId].metaData.styles[id];
        }

        if (state.blogs[blogId].metaData.imgLinks[id]) {
          imgLinks[newId] = state.blogs[blogId].metaData.imgLinks[id];
        }

        if (!Array.isArray(component.children)) return;

        component.children.forEach((childrenId) => {
          replicateComponentChildrens(childrenId, newId);
        });
      };

      replicateComponentChildrens(
        id,
        state.blogs[blogId].components[id]?.parentId ?? null,
        true
      );

      const parentId = state.blogs[blogId].components[id].parentId;

      if (
        parentId &&
        Array.isArray(state.blogs[blogId].components[parentId]?.children)
      ) {
        const indexToInsertComponent =
          state.blogs[blogId].components[parentId].children.indexOf(id);

        state.blogs[blogId].components[parentId].children.splice(
          indexToInsertComponent + 1,
          0,
          startId
        );
      } else if (state.blogs[blogId].content.includes(id)) {
        const indexToInsertComponent = state.blogs[blogId].content.indexOf(id);

        state.blogs[blogId].content.splice(
          indexToInsertComponent + 1,
          0,
          startId
        );
      }

      state.blogs[blogId].components = {
        ...state.blogs[blogId].components,
        ...components,
      };

      state.blogs[blogId].metaData.styles = {
        ...state.blogs[blogId].metaData.styles,
        ...styles,
      };

      state.blogs[blogId].metaData.imgLinks = {
        ...state.blogs[blogId].metaData.imgLinks,
        ...imgLinks,
      };
    },

    toggleEditorOrPreview: (state, action: PayloadAction<string>) => {
      const activeEditorOrPreview = state.blogs[action.payload].editorOrPreview;

      state.blogs[action.payload].editorOrPreview =
        activeEditorOrPreview === "editor" ? "preview" : "editor";
    },

    changeActiveBlock: (
      state,
      action: PayloadAction<{
        blogId: string;
        activeBlockId?: string | null;
      }>
    ) => {
      const { blogId, activeBlockId } = action.payload;

      if (state.blogs[blogId].activeBlock === activeBlockId) return state;

      state.blogs[blogId].activeBlock = activeBlockId ?? null;
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

    togglePaddingAll: (
      state,
      action: PayloadAction<{
        blogId: string;
        activeBlockId: string;
      }>
    ) => {
      const { blogId, activeBlockId } = action.payload;

      const screenType = state.blogs[blogId].screenType ?? "desktop";

      if (
        screenType === "mobile" &&
        !state.blogs[blogId].metaData.mobileStyles[activeBlockId]
      )
        state.blogs[blogId].metaData.mobileStyles[activeBlockId] = {};
      else if (
        screenType === "desktop" &&
        !state.blogs[blogId].metaData.styles[activeBlockId]
      )
        state.blogs[blogId].metaData.styles[activeBlockId] = {};

      const styles =
        screenType === "mobile"
          ? state.blogs[blogId].metaData.mobileStyles[activeBlockId]
          : state.blogs[blogId].metaData.styles[activeBlockId];

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
        styles.paddingLeft = styles.padding ?? 0;
        styles.paddingRight = styles.padding ?? 0;
        styles.paddingTop = styles.padding ?? 0;
        styles.paddingBottom = styles.padding ?? 0;

        delete styles.padding;

        return state;
      }
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

      const screenType = state.blogs[blogId].screenType ?? "desktop";

      const blockStyles =
        screenType === "mobile"
          ? state.blogs[blogId].metaData.mobileStyles[activeBlockId]
          : state.blogs[blogId].metaData.styles[activeBlockId];

      for (const key in styles) {
        const value = styles[key];

        // Get the current value or fallback to default
        const currentValue = blockStyles?.[key] ?? defaultStyles?.[key];

        // Update value with increment/decrement or direct value
        styles[key] = updateStyleValue(value, currentValue);

        // Apply min/max constraints
        styles[key] = applyMinMaxStyles(styles, key, minStyles, maxStyles);
      }

      // Update the styles in the correct block
      const targetBlockStyles =
        screenType === "mobile"
          ? state.blogs[blogId].metaData.mobileStyles
          : state.blogs[blogId].metaData.styles;

      targetBlockStyles[activeBlockId] = {
        ...(targetBlockStyles[activeBlockId] ?? {}),
        ...styles,
      };
    },

    addGlobalStyle: (
      state,
      action: PayloadAction<{
        blogId: string;
        type: BlockTypes;
        styles: StyleType;
        minStyles?: StyleType;
        maxStyles?: StyleType;
      }>
    ) => {
      const { blogId, type, styles, minStyles, maxStyles } = action.payload;

      const screenType = state.blogs[blogId].screenType ?? "desktop";

      const blockStyles =
        state.blogs[blogId].metaData.globalStyles[screenType][type];

      for (const key in styles) {
        const value = styles[key];

        // Get the current value or fallback to default
        const currentValue =
          blockStyles?.[key] ?? defaultGlobalStyles[screenType][type]?.[key];

        // Update value with increment/decrement or direct value
        styles[key] = updateStyleValue(value, currentValue);

        // Apply min/max constraints
        styles[key] = applyMinMaxStyles(styles, key, minStyles, maxStyles);
      }

      // Update the styles in the correct block
      const targetBlockStyles =
        state.blogs[blogId].metaData.globalStyles[screenType];

      targetBlockStyles[type] = {
        ...targetBlockStyles[type],
        ...styles,
      };
    },

    removeStyle: (
      state,
      action: PayloadAction<{
        blogId: string;
        activeBlockId: string;
        propertyName: string;
      }>
    ) => {
      const { blogId, activeBlockId, propertyName } = action.payload;

      if (
        !state.blogs[blogId].metaData.styles[activeBlockId] ||
        !(propertyName in state.blogs[blogId].metaData.styles[activeBlockId])
      )
        return state;

      delete state.blogs[blogId].metaData.styles[activeBlockId][propertyName];
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

    changeLink: (
      state,
      action: PayloadAction<{
        blogId: string;
        id: string; // component id
        link: string;
      }>
    ) => {
      const { blogId, id, link } = action.payload;

      const blockComponent = state.blogs[blogId]?.components?.[id];

      if (!blockComponent) return;

      if (link) blockComponent.link = link;
    },

    /*** Blockquote ======================== ***/
    changeBlockquoteContent: (
      state,
      action: PayloadAction<{
        blogId: string;
        id: string; // component id
        blockquote: Partial<BlockquoteInterface>;
      }>
    ) => {
      const { blogId, id, blockquote } = action.payload;

      const blockComponent = state.blogs[blogId]?.components?.[id];

      if (!blockComponent || blockComponent.type !== "blockquote") return;

      let blockquoteData = blockComponent.children as BlockquoteInterface;

      blockComponent.children = {
        ...blockquoteData,
        ...blockquote,
      };
    },

    /*** Code ========================***/
    changeCodeTheme: (
      state,
      action: PayloadAction<{
        blogId: string;
        id: string; // component id
        theme: CodeThemeModeType;
      }>
    ) => {
      const { blogId, id, theme } = action.payload;

      const blockComponent = state.blogs[blogId]?.components?.[id];

      if (!blockComponent) return;

      if (theme) blockComponent.codeThemeMode = theme;
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
  gotoUpDownComponent,
  gotoPreviousNextComponent,
  removeComponent,
  duplicateComponent,
  toggleisImageEditorOpen,
  changeHoveringComponentId,
  updateTitle,
  toggleScreenType,
  toggleEditorOrPreview,
  changeActiveBlock,
  updateComponentText,
  createActiveBlockStyle,
  togglePaddingAll,
  toggleBorderRadiusAll,
  addBorderStyle,
  updateOpacity,
  linkRedirect,
  toggleBorderAll,
  setAlignment,
  addStyle,
  addGlobalStyle,
  removeStyle,
  changeType,
  changeLink,
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
  /* blockquote */
  changeBlockquoteContent,
  /* code */
  changeCodeTheme,
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
  /* accordion ========== */
  changeAccordionContent,
  changeAccordionCount,
} = blogBuilderSlice.actions;

export default blogBuilderSlice.reducer;
