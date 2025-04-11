"use client";

import React, { memo, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import useActiveStyleSettingTab from "@/hooks/editor/use-active-style-setting-tab";
import { selectBlogGlobalStyle } from "@/redux/features/builders/selectors";
import CodeThemeType from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/CodeThemeType";
import {
  addGlobalStyle,
  CodeThemeModeType,
} from "@/redux/features/builders/blogBuilderSlice";

const CodeThemeMode = memo(() => {
  const dispatch = useAppDispatch();
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return null;

  const globalStyles = useAppSelector((state) =>
    selectBlogGlobalStyle(state, blogId)
  );

  const activeStyle = useActiveStyleSettingTab({
    globalStyles,
    screenType: "desktop",
    type: "code",
    propertyName: "background",
  });

  const handleChange = useCallback(
    (value: CodeThemeModeType) => {
      dispatch(
        addGlobalStyle({
          blogId,
          type: "code",
          styles: {
            background: value,
          },
        })
      );
    },
    [dispatch, blogId]
  );

  return (
    <CodeThemeType
      selectedTheme={(activeStyle.background ?? "dark") as CodeThemeModeType}
      handleChange={handleChange}
    />
  );
});

export default CodeThemeMode;
