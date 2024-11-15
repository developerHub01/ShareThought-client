"use client";

import { Menu as MenuIcon } from "lucide-react";
import { ComponentProps, ElementRef, forwardRef } from "react";
import { useSidebar } from "@/components/sidebar/SidebarMain";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const AppSidebarTrigger = forwardRef<
  ElementRef<typeof Button>,
  ComponentProps<typeof Button>
>(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      ref={ref}
      data-sidebar="trigger"
      variant="ghost"
      size="icon"
      className={cn("flex-shrink-0 size-8", className)}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <MenuIcon size={20} strokeWidth={2} />
    </Button>
  );
});

AppSidebarTrigger.displayName = "AppSidebarTrigger";
export default AppSidebarTrigger;
