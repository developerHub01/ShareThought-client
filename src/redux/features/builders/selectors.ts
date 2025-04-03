import { RootState } from "@/redux/store";
import { createSelector } from "@reduxjs/toolkit";

export const selectBlogTitle = createSelector(
  [
    (state: RootState, blogId: string) =>
      state.blogBuilder.blogs[blogId]?.title,
  ],
  (title) => title ?? ""
);

export const selectBlogContent = createSelector(
  [
    (state: RootState, blogId: string) =>
      state.blogBuilder.blogs[blogId]?.content,
  ],
  (content) => content ?? []
);

export const selectBlogActiveBlock = createSelector(
  [
    (state: RootState, blogId: string) =>
      state.blogBuilder.blogs[blogId]?.activeBlock,
  ],
  (activeBlock) => activeBlock
);

export const selectBlogScreenType = createSelector(
  [
    (state: RootState, blogId: string) =>
      state.blogBuilder.blogs[blogId]?.screenType,
  ],
  (screenType) => screenType ?? "desktop"
);

export const selectBlogComponents = createSelector(
  [
    (state: RootState, blogId: string) =>
      state.blogBuilder.blogs[blogId]?.components,
  ],
  (components) => components ?? {}
);

export const selectBlogComponentById = createSelector(
  [
    (state: RootState, blogId: string, componentId?: string | null) =>
      !componentId
        ? null
        : state.blogBuilder.blogs[blogId]?.components?.[componentId],
  ],
  (component) => component ?? null
);

export const selectBlogImgLinkById = createSelector(
  [
    (state: RootState, blogId: string, componentId?: string | null) =>
      !componentId
        ? null
        : state.blogBuilder.blogs[blogId]?.metaData.imgLinks?.[componentId],
  ],
  (link) => link
);

export const selectBlogStylesById = createSelector(
  [
    (state: RootState, blogId: string, componentId?: string | null) =>
      !componentId
        ? null
        : state.blogBuilder.blogs[blogId]?.metaData.styles?.[componentId],
  ],
  (styles) => styles ?? {}
);

export const selectBlogMobileStylesById = createSelector(
  [
    (state: RootState, blogId: string, componentId?: string | null) =>
      !componentId
        ? null
        : state.blogBuilder.blogs[blogId]?.metaData.mobileStyles?.[componentId],
  ],
  (styles) => styles ?? {}
);

export const selectBlogGlobalStyle = createSelector(
  [
    (state: RootState, blogId: string) =>
      state.blogBuilder.blogs[blogId]?.metaData.globalStyles,
  ],
  (styles) => styles ?? {}
);

export const selectBlogHoveringComponentId = createSelector(
  [(state: RootState) => state.blogBuilder.hoveringComponentId],
  (id) => id
);

export const selectBlogActiveComponentFullPath = createSelector(
  [
    (state: RootState, blogId: string) => {
      const { components } = state.blogBuilder?.blogs?.[blogId] || {};

      return components;
    },
    (state: RootState, blogId: string) => {
      const { activeBlock } = state.blogBuilder?.blogs?.[blogId] || {};

      return activeBlock;
    },
  ],
  (components, id) => {
    let path: Array<string> = [];

    if (!components || !id) return path;

    const getFullPathRecursive = (id: string): Array<string> => {
      if (!id || !components?.[id]) return [];

      const result = getFullPathRecursive(components[id].parentId ?? "");

      result.push(id);

      return result;
    };

    path = getFullPathRecursive(id);

    return path;
  }
);
