"use client";

import React, { memo, useCallback } from "react";
import { useParams } from "next/navigation";
import {
  changeCodeTheme,
  CodeThemeModeType,
} from "@/redux/features/builders/blogBuilderSlice";
import CodeThemeType from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/CodeThemeType";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  selectBlogActiveBlock,
  selectBlogComponentById,
  selectBlogGlobalStyle,
} from "@/redux/features/builders/selectors";

const CodeThemeMode = memo(() => {
  const dispatch = useAppDispatch();
  const { id: blogId } = useParams<{ id: string }>();

  const activeBlock = useAppSelector((state) =>
    selectBlogActiveBlock(state, blogId)
  );
  const component = useAppSelector((state) =>
    selectBlogComponentById(state, blogId, activeBlock)
  );
  const globalStyles = useAppSelector((state) =>
    selectBlogGlobalStyle(state, blogId)
  );

  if (!blogId || !activeBlock || !component) return null;

  const selectedTheme = (component.codeThemeMode ??
    globalStyles?.desktop?.code?.background ??
    "dark") as CodeThemeModeType;

  const handleChange = useCallback(
    (theme: CodeThemeModeType) => {
      dispatch(
        changeCodeTheme({
          blogId,
          id: activeBlock,
          theme,
        })
      );
    },
    [dispatch, blogId, activeBlock]
  );

  return (
    <CodeThemeType selectedTheme={selectedTheme} handleChange={handleChange} />
  );
});

export default CodeThemeMode;
