"use client";

import React, { useEffect, useState } from "react";
import AvatarActionButton from "@/components/navbar/right/avatar/AvatarActionButton";
import {
  RightIcon as ArrowIcon,
  LightIcon,
  DarkIcon,
  ThemeIcon,
  SystemIcon,
  LucideIcon,
} from "@/lib/icons";
import { useTheme } from "next-themes";
import { TThemeId } from "@/types";

interface ITheme {
  id: TThemeId;
  label: string;
  Icon: LucideIcon;
}

const themeList: Array<ITheme> = [
  {
    id: "light",
    label: "light theme",
    Icon: LightIcon,
  },
  {
    id: "dark",
    label: "dark theme",
    Icon: DarkIcon,
  },
  {
    id: "system",
    label: "system theme",
    Icon: SystemIcon,
  },
];

const ThemeMode = () => {
  const { setTheme, theme } = useTheme();
  const [isOpen, setOpen] = useState<boolean>(false);
  const [activeThemeId, setActiveThemeId] = useState<string>(theme || "system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleToggleButton = () => setOpen((prev) => !prev);
  const handleActiveThemeId = (theme: TThemeId) => setActiveThemeId(theme);

  return (
    <div className="flex flex-col">
      <AvatarActionButton
        label="theme"
        Icon={ThemeIcon}
        IndicatorIcon={ArrowIcon}
        onClick={handleToggleButton}
      />
      {mounted && isOpen && (
        <div className="flex flex-col">
          {themeList.map((props) => (
            <AvatarActionButton
              key={props.id}
              {...props}
              onClick={() => {
                handleActiveThemeId(props.id);
                setTheme(props.id);
              }}
              havePrefix
              isActive={props.id === activeThemeId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeMode;
