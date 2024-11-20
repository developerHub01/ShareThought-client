import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/sidebar/SidebarMain";
import SidebarMenuButtonLink from "@/components/sidebar/SidebarMenuButtonLink";

interface NavMainProps
  extends React.ComponentPropsWithoutRef<typeof SidebarGroup> {
  navItems: Array<{
    id: string;
    label: string;
    url: string;
    icon: string;
  }>;
}

export function NavMain({ navItems, ...props }: NavMainProps) {
  return (
    <SidebarGroup {...props}>
      <SidebarMenu>
        {navItems.map(({ id, label, icon, url }) => (
          <SidebarMenuItem key={id}>
            <SidebarMenuButtonLink icon={icon} url={url} label={label} />
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
