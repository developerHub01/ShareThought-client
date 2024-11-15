"use client";

import React, { useState } from "react";
import AvatarActionButton from "@/components/navbar/right/avatar/AvatarActionButton";
import {
  ChevronRight as ArrowIcon,
  Sun as LightIcon,
  Moon as DarkIcon,
  Palette as ThemeIcon,
  MonitorCog as SystemIcon,
  LucideIcon,
} from "lucide-react";

type TThemeId = "dark" | "light" | "system";

interface ITheme {
  id: TThemeId;
  label: string;
  Icon: LucideIcon;
  onClick: () => void;
}

const themeList: Array<ITheme> = [
  {
    id: "light",
    label: "light theme",
    Icon: LightIcon,
    onClick: () => {},
  },
  {
    id: "dark",
    label: "dark theme",
    Icon: DarkIcon,
    onClick: () => {},
  },
  {
    id: "system",
    label: "system theme",
    Icon: SystemIcon,
    onClick: () => {},
  },
];

const ThemeMode = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [activeThemeId, setActiveThemeId] = useState<string>("system");

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
              onClick={() => handleActiveThemeId(props.id)}
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
