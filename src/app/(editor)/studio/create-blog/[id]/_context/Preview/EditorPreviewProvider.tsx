"use client";

import { ScreenTypes } from "@/redux/features/builders/blogBuilderSlice";
import React, { createContext, useContext, useState } from "react";

interface EditorPreviewContext {
  screenType: ScreenTypes;
  toggleScreenType: () => void;
  changeScreenType: (value: ScreenTypes) => void;
}

const EditorPreviewContext = createContext<EditorPreviewContext | null>(null);

export const useEditorPreview = () => {
  const context = useContext(EditorPreviewContext);

  if (!context) {
    throw new Error(
      "useEditorPreview must be used within a EditorPreviewProvider."
    );
  }

  return context;
};

interface PreviewProviderProps {
  children: React.ReactNode;
}

const EditorPreviewProvider = ({ children }: PreviewProviderProps) => {
  const [screenType, setScreenType] = useState<ScreenTypes>("desktop");

  const toggleScreenType = () =>
    setScreenType((prev) => (prev === "desktop" ? "mobile" : "desktop"));

  const changeScreenType = (value: ScreenTypes) => setScreenType(value);

  return (
    <EditorPreviewContext.Provider
      value={{
        screenType,
        toggleScreenType,
        changeScreenType,
      }}
    >
      {children}
    </EditorPreviewContext.Provider>
  );
};

export default EditorPreviewProvider;
