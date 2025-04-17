"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { addSharePostId } from "@/redux/features/create-community-post/createCommunityPostSlice";
import { useAppDispatch } from "@/redux/hooks";

interface SharePostProviderContext {
  postList: Array<string> | null;
  selectedPostId: string;
  handleChangeSearchTerm: (value: string) => void;
  handleSearch: (value: string) => void;
  handleClearSearch: () => void;
  handleSelectPost: (id: string) => void;
  handleAddCommunityPostId: () => void;
}

const SharePostContext = createContext<SharePostProviderContext | null>(null);

export const useSharePost = () => {
  const context = useContext(SharePostContext);

  if (!context) {
    throw new Error("useSharePost must be used within a SharePostProvider.");
  }

  return context;
};

interface SharePostProviderProps {
  children: React.ReactNode;
}

const SharePostProvider = ({ children }: SharePostProviderProps) => {
  const [postList, setPostList] = useState<Array<string> | null>(null);
  const [selectedPostId, setSelectedPostId] = useState<string>("");
  const dispatch = useAppDispatch();

  const handleSearch = useCallback((value: string) => {}, []);

  const handleChangeSearchTerm = useCallback((value: string) => {
    setPostList([]);
  }, []);

  const handleSelectPost = useCallback(
    (id: string) => setSelectedPostId((prev) => (prev === id ? "" : id)),
    []
  );

  const handleAddCommunityPostId = useCallback(() => {
    dispatch(
      addSharePostId({
        postId: selectedPostId,
      })
    );
  }, [selectedPostId]);

  const handleClearSearch = useCallback(() => {
    setPostList(null);
  }, []);

  return (
    <SharePostContext.Provider
      value={{
        postList,
        selectedPostId,
        handleChangeSearchTerm,
        handleSearch,
        handleClearSearch,
        handleSelectPost,
        handleAddCommunityPostId,
      }}
    >
      {children}
    </SharePostContext.Provider>
  );
};

export default SharePostProvider;
