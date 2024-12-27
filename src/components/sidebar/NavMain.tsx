import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/sidebar/SidebarMain";
import SidebarMenuButtonLink from "@/components/sidebar/SidebarMenuButtonLink";
import { Fragment } from "react";
import MenuItemCollapseible from "@/components/sidebar/MenuItemCollapseible";

interface BaseItem {
  id: string;
  label: string;
  icon?: string;
}

interface NavItemWithUrl extends BaseItem {
  url: string;
  items?: never;
}

export interface NavItemWithChildren extends BaseItem {
  items: Array<NavItemWithUrl>;
  url?: never;
}

type NavItem = NavItemWithUrl | NavItemWithChildren;

interface NavMainProps
  extends React.ComponentPropsWithoutRef<typeof SidebarGroup> {
  navItems: Array<NavItem>;
}

export function NavMain({ navItems, ...props }: NavMainProps) {
  return (
    <SidebarGroup {...props}>
      <SidebarMenu>
        {navItems.map((item) => (
          <Fragment key={item.id}>
            {item.url && <MenuItem {...item} />}
            {item.items && <MenuItemCollapseible {...item} />}
          </Fragment>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

const MenuItem = ({ id, ...props }: NavItemWithUrl) => {
  return (
    <SidebarMenuItem key={id}>
      <SidebarMenuButtonLink {...props} />
    </SidebarMenuItem>
  );
};
