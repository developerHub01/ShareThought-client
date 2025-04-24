"use client";

import React, { memo, useCallback, useEffect, useState } from "react";
import { DarkIcon, LightIcon, LucideIcon, SystemIcon } from "@/lib/icons";
import ToggleList from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/ToggleList";
import { OrientationType, TThemeId } from "@/types";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

const themeList: Array<{
  id: TThemeId;
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
const ThemeBlock = memo(({ className, orientation }: ThemeBlockProps) => {
  const [mounted, setMounted] = useState(false);
  const { setTheme, theme } = useTheme();

  useEffect(() => setMounted(true), []);

  const handleChange = useCallback((theme: string) => {
    if (!theme) return;
    setTheme(theme);
  }, []);

  if (!mounted) return null;

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
});

export default ThemeBlock;
