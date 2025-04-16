"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  changePostImage,
  getCommunityPostImageIndex,
} from "@/redux/features/create-community-post/createCommunityPostSlice";
import { selectCommunityPostImages } from "@/redux/features/create-community-post/selectors";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

interface ImagePostContext {
  selectedId: string;
  setSelectedId: React.Dispatch<React.SetStateAction<string>>;
  isEditorMode: boolean;
  setIsEditorMode: React.Dispatch<React.SetStateAction<boolean>>;
  selectedImageBlob: string;
  handleSaveEditedImage: (image: string) => void;
  saveImageFlag: boolean;
  setSaveImageFlag: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [selectedImageBlob, setSelectedImageBlob] = useState<string>("");
  const [selectedId, setSelectedId] = useState<string>("");
  const [isEditorMode, setIsEditorMode] = useState<boolean>(false);
  const [saveImageFlag, setSaveImageFlag] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleSaveEditedImage = useCallback(
    (image: string) => {
      dispatch(
        changePostImage({
          id: selectedId,
          image,
        })
      );
      setIsEditorMode(false);
      setSelectedImageBlob("");
    },
    [selectedId]
  );

  useEffect(() => {
    setIsEditorMode(false);
  }, [selectedId]);

  useEffect(() => {
    const index = getCommunityPostImageIndex(images, selectedId);

    if (index >= 0) return;

    if (!images.length) return setSelectedId("");

    setSelectedId(images?.[index]?.id ?? "");
  }, [images]);

  useEffect(() => {
    const index = getCommunityPostImageIndex(images, selectedId);
    const imageUrl = images?.[index]?.url;

    if (index >= 0 || !imageUrl) setSelectedImageBlob("");

    if (isEditorMode) setSelectedImageBlob(imageUrl);
    else setSelectedImageBlob("");
  }, [selectedId, isEditorMode, images]);

  return (
    <ImagePostContext.Provider
      value={{
        selectedId,
        setSelectedId,
        isEditorMode,
        setIsEditorMode,
        selectedImageBlob,
        handleSaveEditedImage,
        saveImageFlag,
        setSaveImageFlag,
      }}
    >
      {children}
    </ImagePostContext.Provider>
  );
};

export default ImagePostProvider;
