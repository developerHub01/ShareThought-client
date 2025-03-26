"use client";

import React, { useMemo, useState } from "react";
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

type TThemeId = "dark" | "light" | "system";

interface ITheme {
  id: TThemeId;
  label: string;
  Icon: LucideIcon;
  onClick: () => void;
}

const ThemeMode = () => {
  const { setTheme, theme } = useTheme();

  const themeList: Array<ITheme> = useMemo(
    () => [
      {
        id: "light",
        label: "light theme",
        Icon: LightIcon,
        onClick: () => setTheme("light"),
      },
      {
        id: "dark",
        label: "dark theme",
        Icon: DarkIcon,
        onClick: () => setTheme("dark"),
      },
      {
        id: "system",
        label: "system theme",
        Icon: SystemIcon,
        onClick: () => setTheme("system"),
      },
    ],
    [setTheme]
  );

  const [isOpen, setOpen] = useState<boolean>(false);
  const [activeThemeId, setActiveThemeId] = useState<string>(theme || "system");

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
      {isOpen && (
        <div className="flex flex-col">
          {themeList.map((props) => (
            <AvatarActionButton
              key={props.id}
              {...props}
              onClick={() => {
                handleActiveThemeId(props.id);
                props.onClick();
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
