import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/sidebar/SidebarMain";
import StudioSidebarTop from "@/components/sidebar/StudioSidebarTop";
import StudioSidebarMenuList from "@/components/sidebar/StudioSidebarMenuList";

export function StudioSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <StudioSidebarTop />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <StudioSidebarMenuList />
      </SidebarContent>
    </Sidebar>
  );
}
