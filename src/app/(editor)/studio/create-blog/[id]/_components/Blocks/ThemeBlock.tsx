"use client";

import React, { useCallback } from "react";
import { DarkIcon, LightIcon, LucideIcon, SystemIcon } from "@/lib/icons";
import ToggleList from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/ToggleList";
import { OrientationType } from "@/types";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

const themeList: Array<{
  id: string;
  label: string;
  Icon: LucideIcon;
}> = [
  {
    id: "light",
    label: "Light Theme",
    Icon: LightIcon,
  },
  {
    id: "dark",
    label: "Dark Theme",
    Icon: DarkIcon,
  },
  {
    id: "system",
    label: "System Theme",
    Icon: SystemIcon,
  },
];

interface ThemeBlockProps {
  className?: string;
  orientation?: OrientationType;
}
const ThemeBlock = ({ className, orientation }: ThemeBlockProps) => {
  const { setTheme, theme } = useTheme();

  const handleChange = useCallback((theme: string) => {
    setTheme(theme);
  }, []);

  return (
    <ToggleList
      orientation={orientation}
      size="sm"
      className={cn("", className)}
      toggleList={themeList}
      handleChange={handleChange}
      activeItem={theme ?? themeList[0].id}
    />
  );
};

export default ThemeBlock;
