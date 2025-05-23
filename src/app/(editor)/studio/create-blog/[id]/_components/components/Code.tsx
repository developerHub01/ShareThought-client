"use client";

import { useParams } from "next/navigation";
import React, { FocusEvent, useEffect, useState } from "react";
import CodeMirror, { ViewUpdate } from "@uiw/react-codemirror";
import { githubDark, githubLight } from "@uiw/codemirror-theme-github";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  CodeThemeModeType,
  updateComponentText,
} from "@/redux/features/builders/blogBuilderSlice";
import {
  selectBlogComponentById,
  selectBlogComponentText,
  selectBlogGlobalStyle,
  selectBlogStylesById,
} from "@/redux/features/builders/selectors";
import handleWrapperContentStyleSeparator from "@/utils/editor/handleWrapperContentStyleSeparator";

interface CodeProps {
  id: string;
  parentId?: string;
}

export type { CodeProps };

const Code = ({ id, parentId, ...props }: CodeProps) => {
  const { id: blogId } = useParams<{ id: string }>();
  const [code, setCode] = useState("");
  const dispatch = useAppDispatch();

  if (!blogId) return null;

  const syncCode = useAppSelector((state) =>
    selectBlogComponentText(state, blogId, id)
  );
  const styles = useAppSelector((state) =>
    selectBlogStylesById(state, blogId, id)
  );
  const component = useAppSelector((state) =>
    selectBlogComponentById(state, blogId, id)
  );
  const globalStyles = useAppSelector((state) =>
    selectBlogGlobalStyle(state, blogId)
  );

  useEffect(() => {
    if (syncCode === code) return;
    setCode(syncCode);
  }, [syncCode]);

  if (!blogId || !component) return null;

  const selectedTheme = (component.codeThemeMode ??
    globalStyles?.desktop?.code?.background ??
    "dark") as CodeThemeModeType;

  let { contentStyles, wrapperStyles } =
    handleWrapperContentStyleSeparator(styles);

  const handleChange = React.useCallback(
    (val: string, viewUpdate: ViewUpdate) => {
      console.log(val);
      setCode(val);
    },
    []
  );

  const handleBlur = (
    e: FocusEvent<HTMLHeadElement | HTMLParagraphElement>
  ) => {
    dispatch(
      updateComponentText({
        blogId,
        id,
        text: code ?? "",
      })
    );
  };

  return (
    <div
      className="grid grid-cols-12"
      style={{
        ...wrapperStyles,
      }}
    >
      <div className="col-span-full border-2 border-accent">
        <CodeMirror
          className="w-full whitespace-pre-wrap"
          style={{
            ...contentStyles,
          }}
          value={code}
          height="auto"
          theme={selectedTheme === "dark" ? githubDark : githubLight}
          extensions={[
            markdown({ base: markdownLanguage, codeLanguages: languages }),
            // EditorView.lineWrapping,
          ]}
          onChange={handleChange}
          onBlur={handleBlur}
          autoFocus={true}
        />
      </div>
    </div>
  );
};

export default Code;
