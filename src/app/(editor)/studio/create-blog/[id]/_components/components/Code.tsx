"use client";

import { useParams } from "next/navigation";
import React, { FocusEvent, useEffect, useState } from "react";
import CodeMirror, { ViewUpdate } from "@uiw/react-codemirror";
import { githubDark } from "@uiw/codemirror-theme-github";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateComponentText } from "@/redux/features/builders/blogBuilderSlice";
import { selectBlogComponentText } from "@/redux/features/builders/selectors";

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

  useEffect(() => {
    setCode(syncCode);
  }, [syncCode]);

  const handleChange = React.useCallback(
    (val: string, viewUpdate: ViewUpdate) => {
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
        text: e.target.innerText ?? "",
      })
    );
  };

  return (
    <CodeMirror
      value={code}
      height="auto"
      theme={githubDark}
      extensions={[
        markdown({ base: markdownLanguage, codeLanguages: languages }),
      ]}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
};

export default Code;
