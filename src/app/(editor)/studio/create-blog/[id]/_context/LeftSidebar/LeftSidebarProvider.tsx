"use client";

import React, { createContext, useContext, useState } from "react";

interface LeftSidebarContext {
  sidebarActiveTab: string;
  handleChangeSidebarActiveTab: (id: string) => void;
  handleClearSidebarActiveTab: () => void;
}

const LeftSidebarContext = createContext<LeftSidebarContext | null>(null);

export const useLeftSidebar = () => {
  const context = useContext(LeftSidebarContext);

  if (!context) {
    throw new Error(
      "useLeftSidebar must be used within a LeftSidebarProvider."
    );
  }

  return context;
};

interface LeftSidebarProviderProps {
  children: React.ReactNode;
}

const LeftSidebarProvider = ({ children }: LeftSidebarProviderProps) => {
  const [sidebarActiveTab, setSidebarActiveTab] = useState("");
  const handleChangeSidebarActiveTab = (id: string) => {
    if (id === sidebarActiveTab) return setSidebarActiveTab("");

    return setSidebarActiveTab(id);
  };
  const handleClearSidebarActiveTab = () => setSidebarActiveTab("");

  return (
    <LeftSidebarContext.Provider
      value={{
        sidebarActiveTab,
        handleChangeSidebarActiveTab,
        handleClearSidebarActiveTab,
      }}
    >
      {children}
    </LeftSidebarContext.Provider>
  );
};

export default LeftSidebarProvider;
