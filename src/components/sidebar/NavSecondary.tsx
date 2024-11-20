import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/sidebar/SidebarMain";
import SidebarMenuButtonLink from "@/components/sidebar/SidebarMenuButtonLink";

const menuItems = [
  {
    id: "setting",
    label: "setting",
    url: "/settings",
    icon: "Settings",
  },
  {
    id: "report_history",
    label: "report history",
    url: "/report-history",
    icon: "Flag",
  },
  {
    id: "about_us",
    label: "about us",
    url: "/about-us",
    icon: "BookUser",
  },
];

export function NavSecondary({
  ...props
}: React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {menuItems.map(({ id, label, url, icon }) => {
            return (
              <SidebarMenuItem key={id}>
                <SidebarMenuButtonLink icon={icon} url={url} label={label} />
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
