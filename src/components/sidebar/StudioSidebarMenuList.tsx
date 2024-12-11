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
