import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavMain } from "@/components/sidebar/NavMain";

const navItemsList = {
  navMainItems: [
    {
      id: "dashboard",
      label: "dashboard",
      url: "/studio",
      icon: "LayoutDashboard",
    },
    {
      id: "create-blog",
      label: "create blog",
      url: "/studio/create-blog",
      icon: "SquarePen",
    },
    {
      id: "create-community-post",
      label: "create community post",
      url: "/studio/create-community-post",
      icon: "SquarePen",
    },
  ],
};

const StudioSidebarMenuList = () => {
  const { navMainItems } = navItemsList;
  return (
    <ScrollArea className="h-full w-full">
      <NavMain navItems={navMainItems} />
    </ScrollArea>
  );
};

export default StudioSidebarMenuList;
