import React from "react";
import {
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/sidebar/SidebarMain";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import ParentMenuButton from "@/components/sidebar/ParentMenuButton";
import SidebarMenuButtonLink from "@/components/sidebar/SidebarMenuButtonLink";
import { NavItemWithChildren } from "@/components/sidebar/NavMain";

const MenuItemCollapseible = ({ icon, label, items }: NavItemWithChildren) => {
  return (
    <Collapsible asChild className="group/collapsible">
      <SidebarMenuItem>
        <ParentMenuButton label={label} icon={icon} />
        <CollapsibleContent>
          <SidebarMenuSub>
            {items?.map((item) => (
              <SidebarMenuSubItem key={item.id}>
                <SidebarMenuButtonLink {...item} />
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
};

export default MenuItemCollapseible;
