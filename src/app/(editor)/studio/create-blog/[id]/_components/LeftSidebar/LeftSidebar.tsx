"use client";

import React, { memo } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { NavigatorIcon, LucideIcon } from "@/lib/icons";
import { useEffect, useMemo, useRef, FocusEvent } from "react";
import Navigator from "@/app/(editor)/studio/create-blog/[id]/_components/LeftSidebar/Navigator/Navigator";
import ResponsiveToggleBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/ResponsiveToggleBlock";
import ThemeBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/ThemeBlock";
import { useLeftSidebar } from "@/app/(editor)/studio/create-blog/[id]/_context/LeftSidebar/LeftSidebarProvider";

interface MenuItemInterface {
  id: string;
  label: string;
  Icon: LucideIcon;
  haveContentArea?: boolean;
}

const LeftSidebar = memo(() => {
  const {
    sidebarActiveTab,
    handleChangeSidebarActiveTab,
    handleClearSidebarActiveTab,
  } = useLeftSidebar();
  const menuList = useMemo<Array<MenuItemInterface>>(
    () => [
      {
        id: "navigator",
        label: "Navigator",
        Icon: NavigatorIcon,
        haveContentArea: true,
      },
    ],
    []
  );

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sidebarActiveTab || !containerRef.current) return;

    containerRef.current.focus();
  }, []);

  const handleClick = (id: string) => {};

  const handleBlur = (e: FocusEvent<HTMLDivElement>) => {
    if (!containerRef.current?.contains(e.relatedTarget))
      handleClearSidebarActiveTab();
  };

  return (
    <div
      className="flex flex-shrink-0 flex-grow-0 relative z-50"
      tabIndex={0} // 👈 Makes the div focusable
      ref={containerRef}
      onBlur={handleBlur} // 👈 Triggers when clicking outside
    >
      <div className="min-w-6 h-full p-1 flex flex-col border border-r-2 bg-primary-foreground gap-4 relative z-40">
        <TooltipProvider>
          {menuList.map(({ id, label, Icon, haveContentArea }) => (
            <Tooltip key={id}>
              <TooltipTrigger asChild>
                <Button
                  className={cn("border")}
                  size="smIcon"
                  variant={sidebarActiveTab === id ? "default" : "secondary"}
                  {...(haveContentArea
                    ? { onClick: () => handleChangeSidebarActiveTab(id) }
                    : { onClick: () => handleClick(id) })}
                >
                  <Icon size={18} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={10}>
                <p>{label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
        <ResponsiveToggleBlock orientation="vertical" />
        <ThemeBlock orientation="vertical" />
      </div>
      <Content onClose={handleClearSidebarActiveTab} />
    </div>
  );
});

interface ContentProps {
  onClose?: () => void;
}

const Content = memo(({ onClose }: ContentProps) => {
  return (
    <>
      <Navigator onClose={onClose} />
    </>
  );
});

export default LeftSidebar;
