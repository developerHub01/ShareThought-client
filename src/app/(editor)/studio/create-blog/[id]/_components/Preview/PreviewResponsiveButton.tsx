"use client";

import React from "react";
import ToggleList from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/ToggleList";
import { cn } from "@/lib/utils";
import { OrientationType } from "@/types";
import { LucideIcon, DesktopIcon, MobileIcon } from "@/lib/icons";
import { useEditorPreview } from "@/app/(editor)/studio/create-blog/[id]/_context/Preview/EditorPreviewProvider";

const screenList: Array<{
  id: string;
  label: string;
  Icon: LucideIcon;
}> = [
  {
    id: "desktop",
    label: "Desktop",
    Icon: DesktopIcon,
  },
  {
    id: "mobile",
    label: "Mobile",
    Icon: MobileIcon,
  },
];

interface PreviewResponsiveButtonProps {
  className?: string;
  orientation?: OrientationType;
}
const PreviewResponsiveButton = ({
  className,
  orientation,
}: PreviewResponsiveButtonProps) => {
  const { screenType, toggleScreenType } = useEditorPreview();

  return (
    <ToggleList
      orientation={orientation}
      size="sm"
      className={cn("", className)}
      toggleList={screenList}
      handleChange={toggleScreenType}
      activeItem={screenType ?? screenList[0].id}
    />
  );
};

export default PreviewResponsiveButton;
