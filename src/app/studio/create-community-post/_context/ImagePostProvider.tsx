"use client";

import { getCommunityPostImageIndex } from "@/redux/features/create-community-post/createCommunityPostSlice";
import { selectCommunityPostImages } from "@/redux/features/create-community-post/selectors";
import { useAppSelector } from "@/redux/hooks";
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
  const images =
    useAppSelector((state) => selectCommunityPostImages(state)) ?? [];
  const [selectedId, setSelectedId] = useState<string>("");
  const [isEditorMode, setIsEditorMode] = useState<boolean>(false);

  useEffect(() => {
    setIsEditorMode(false);
  }, [selectedId]);

  useEffect(() => {
    const index = getCommunityPostImageIndex(images, selectedId);

    if (index >= 0) return;

    if (!images.length) return setSelectedId("");

    setSelectedId(images?.[index]?.id ?? "");
  }, [images]);

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
