"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface ImagePostContext {
  selectedId: string;
  setSelectedId: React.Dispatch<React.SetStateAction<string>>;
  isEditorMode: boolean;
  setIsEditorMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const ImagePostContext = createContext<ImagePostContext | null>(null);

export const useImagePost = () => {
  const context = useContext(ImagePostContext);

  if (!context) {
    throw new Error("useImagePost must be used within a ImagePostProvider.");
  }

  return context;
};

interface ImagePostProviderProps {
  children: React.ReactNode;
}

const ImagePostProvider = ({ children }: ImagePostProviderProps) => {
  const [selectedId, setSelectedId] = useState<string>("");
  const [isEditorMode, setIsEditorMode] = useState<boolean>(false);

  useEffect(() => {
    setIsEditorMode(false);
  }, [selectedId]);

  return (
    <ImagePostContext.Provider
      value={{
        selectedId,
        setSelectedId,
        isEditorMode,
        setIsEditorMode,
      }}
    >
      {children}
    </ImagePostContext.Provider>
  );
};

export default ImagePostProvider;
