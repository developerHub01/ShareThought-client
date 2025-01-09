"use client";

import React, { createContext, Dispatch, useContext, useState } from "react";

interface EditorContext {
  selectedIndex: number;
  setSelectedIndex: Dispatch<React.SetStateAction<number>>;
  isComponentDialogOpen: boolean;
  setIsComponentDialogOpen: Dispatch<React.SetStateAction<boolean>>;
}

const EditorContext = createContext<EditorContext | null>(null);

export const useEditor = () => {
  const context = useContext(EditorContext);

  if (!context) {
    throw new Error("useEditor must be used within a EditorProvider.");
  }

  return context;
};

interface EditorProviderProps {
  children: React.ReactNode;
}

const EditorProvider = ({ children }: EditorProviderProps) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isComponentDialogOpen, setIsComponentDialogOpen] = useState(false);

  return (
    <EditorContext.Provider
      value={{
        selectedIndex,
        setSelectedIndex,
        isComponentDialogOpen,
        setIsComponentDialogOpen,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export default EditorProvider;
