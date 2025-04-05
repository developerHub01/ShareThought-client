"use client";

import React, { memo } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useModifyQueryParams from "@/hooks/use-modify-query-params";
import { cn } from "@/lib/utils";
import { NavigatorIcon, LucideIcon } from "@/lib/icons";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, FocusEvent } from "react";
import Navigator from "@/app/(editor)/studio/create-blog/[id]/_components/LeftSidebar/Navigator/Navigator";
import ResponsiveToggleBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/ResponsiveToggleBlock";

interface MenuItemInterface {
  id: string;
  label: string;
  Icon: LucideIcon;
  haveContentArea?: boolean;
}

const LeftSidebar = memo(() => {
  const searchParams = useSearchParams();
  const router = useRouter();
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

  const activeItem = useMemo(() => searchParams.get("sidebar"), [searchParams]);

  useEffect(() => {
    if (!activeItem || !containerRef.current) return;

    containerRef.current.focus();
  }, []);

  const { buildFullPath, modifyParams } = useModifyQueryParams();

  const deleteSidebar = () => {
    router.push(buildFullPath(modifyParams("delete", "sidebar")));
  };

  const toggleContent = useCallback(
    (id: string) => {
      if (searchParams.get("sidebar") === id) return deleteSidebar();

      return router.push(buildFullPath(modifyParams("set", "sidebar", id)));
    },
    [router, searchParams]
  );

  const handleClick = (id: string) => {};

  const handleBlur = (e: FocusEvent<HTMLDivElement>) => {
    // if (!containerRef.current?.contains(e.relatedTarget)) deleteSidebar();
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
                  variant={activeItem === id ? "default" : "secondary"}
                  {...(haveContentArea
                    ? { onClick: () => toggleContent(id) }
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
        <ResponsiveToggleBlock orientation="vertical" className="flex-col" />
      </div>
      <Content onClose={deleteSidebar} />
    </div>
  );
});

interface ContentProps {
  onClose?: () => void;
}

const Content = memo(({onClose}:ContentProps) => {
  return (
    <>
      <Navigator onClose={onClose} />
    </>
  );
});

export default LeftSidebar;
