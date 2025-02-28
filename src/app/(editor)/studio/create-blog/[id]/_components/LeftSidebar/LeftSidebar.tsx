"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useModifyQueryParams from "@/hooks/use-modify-query-params";
import { cn } from "@/lib/utils";
import { Layers as NavigatorIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useCallback, useEffect, useMemo, useRef } from "react";
import Navigator from "@/app/(editor)/studio/create-blog/[id]/_components/LeftSidebar/Navigator/Navigator";

const LeftSidebar = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const menuList = useMemo(
    () => [
      {
        id: "navigator",
        label: "Navigator",
        Icon: NavigatorIcon,
      },
    ],
    []
  );
  const containerRef = useRef<HTMLDivElement>(null);

  const activeItem = useMemo(() => searchParams.get("sidebar"), [searchParams]);

  const { buildFullPath, modifyParams } = useModifyQueryParams();

  useEffect(() => {
    const handleClickListener = (e: MouseEvent) => {
      if (!containerRef.current) return;

      if (containerRef.current.contains(e.target as Node)) return;

      deleteSidebar();
    };

    document.addEventListener("click", handleClickListener);

    return () => {
      document.removeEventListener("click", handleClickListener);
    };
  }, []);

  const deleteSidebar = () =>
    router.push(buildFullPath(modifyParams("delete", "sidebar")));

  const handleClick = useCallback(
    (id: string) => {
      if (searchParams.get("sidebar") === id) return deleteSidebar();

      return router.push(buildFullPath(modifyParams("set", "sidebar", id)));
    },
    [router, searchParams]
  );

  return (
    <div
      className="flex flex-shrink-0 flex-grow-0 relative z-30"
      tabIndex={0} // 👈 Makes the div focusable
      ref={containerRef}
    >
      <div className="min-w-6 h-full p-1 flex flex-col border border-r-2 bg-primary-foreground gap-4 relative z-40">
        <TooltipProvider>
          {menuList.map(({ id, label, Icon }) => (
            <Tooltip key={id}>
              <TooltipTrigger asChild>
                <Button
                  className={cn("border")}
                  size="smIcon"
                  variant={activeItem === id ? "default" : "secondary"}
                  onClick={() => handleClick(id)}
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
      </div>
      <Navigator />
    </div>
  );
};

export default LeftSidebar;
