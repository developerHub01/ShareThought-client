"use client";

import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavMain } from "@/components/sidebar/NavMain";
import { NavSecondary } from "@/components/sidebar/NavSecondary";

const SidebarMenuList = () => {
  return (
    <ScrollArea className="h-full w-full">
      <NavMain />
      <NavSecondary className="mt-auto" />
    </ScrollArea>
  );
};

export default SidebarMenuList;
