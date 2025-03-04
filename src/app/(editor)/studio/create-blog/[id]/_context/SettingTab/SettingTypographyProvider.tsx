"use client";

import { BlockTypes, TypographyType } from "@/redux/features/builders/blogBuilderSlice";
import React, { createContext, Dispatch, useContext, useState } from "react";

interface SettingTypographyContext {
  selectedTypography: BlockTypes;
  setSelectedTypography: Dispatch<React.SetStateAction<TypographyType>>;
}

const SettingTypographyContext = createContext<SettingTypographyContext | null>(
  null
);

export const useSettingTypography = () => {
  const context = useContext(SettingTypographyContext);

  if (!context) {
    throw new Error(
      "useSettingTypography must be used within a SettingTypographyProvider."
    );
  }

  return context;
};

interface SettingTypographyProviderProps {
  children: React.ReactNode;
}

const SettingTypographyProvider = ({
  children,
}: SettingTypographyProviderProps) => {
  const [selectedTypography, setSelectedTypography] =
    useState<TypographyType>("h1");

  return (
    <SettingTypographyContext.Provider
      value={{
        selectedTypography,
        setSelectedTypography,
      }}
    >
      {children}
    </SettingTypographyContext.Provider>
  );
};

export default SettingTypographyProvider;
